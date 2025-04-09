import { NextResponse } from 'next/server';
import { ChatOpenAI } from "@langchain/openai";
import * as dotenv from "dotenv";
dotenv.config();
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { createStuffDocumentsChain } from "langchain/chains/combine_documents"
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter"
import { OpenAIEmbeddings } from "@langchain/openai";
import { PineconeStore } from "@langchain/pinecone";
import { createRetrievalChain } from "langchain/chains/retrieval"
import { JSONLoader } from "langchain/document_loaders/fs/json";
import { Pinecone as PineconeClient } from "@pinecone-database/pinecone";
import { BufferMemory } from "langchain/memory";
import { ConversationChain } from "langchain/chains";

const pinecone = new PineconeClient();

// async function initializeVectorStore() {
//     const loader = new JSONLoader("./app/api/bot/items.json");
//     const documents = await loader.load();

//     const splitter = new RecursiveCharacterTextSplitter({
//         chunkSize: 300,
//         chunkOverlap: 50,
//     });
//     const splitDocs = await splitter.splitDocuments(documents);

//     const embeddings = new OpenAIEmbeddings({
//         model: "text-embedding-3-large",
//     });

//     const pineconeIndex = pinecone.Index(process.env.PINECONE_INDEX);

//     const vectorStore = await PineconeStore.fromDocuments(splitDocs, embeddings, {
//         pineconeIndex,
//         maxConcurrency: 5,
//     });

//     console.log("Vector store initialized with museum data");
//     return vectorStore;
// }
// initializeVectorStore();


async function getVectorStore() {
    const pineconeIndex = pinecone.Index(process.env.PINECONE_INDEX);
    const embeddings = new OpenAIEmbeddings({
        model: "text-embedding-3-large",
    });

    return await PineconeStore.fromExistingIndex(embeddings, { pineconeIndex });
}

export async function POST(request) {
    try {
        const { query, sessionId } = await request.json();

        const vectorStore = await getVectorStore();
        // const vectorStore = await initializeVectorStore();

        const model = new ChatOpenAI({
            modelName: "gpt-3.5-turbo",
            temperature: 0.3,
        });

        // const memory = new BufferMemory({
        //     memoryKey: "chat_history",
        //     inputKey: "input",
        //     outputKey: "output",
        // });

        const retriever = vectorStore.asRetriever({
            k: 5,
        });

        const prompt = ChatPromptTemplate.fromMessages([
            ["system", `You are a knowledgeable museum assistant. Use the following information about places and tickets to answer visitor questions accurately and suggest exhibits or tickets when appropriate. All prices are in USD.

            Remember:
            
            1. Only provide information that is explicitly stated in the place or ticket details.
            2. If asked about availability, assume all listed places and tickets are available unless stated otherwise.
            3. Do not invent or assume any information not present in the provided details.
            4. If asked to compare places or tickets, only do so if you have information on all mentioned items.
            5. Always mention the price when discussing a ticket.
            6. If asked about features or artifacts, provide all relevant details from the information.
            7. When suggesting a place, format your response as a JSON object with a "place" key containing ALL place details exactly as they appear in the original JSON, specially never forgot itemUrl and imageUrl.
            8. When suggesting a ticket, format your response as a JSON object with a "ticket" key containing ALL ticket details exactly as they appear in the original JSON, specially never forget itemUrl and imageUrl.
            9. For general responses or when not suggesting a specific item, format your response as a JSON object with a "message" key.
            10. Do not modify, omit, or add any fields when returning a place or ticket suggestion.
            11. In any case don't send any objects or arrays in the response, only send the message.

            Museum Information: {context}`],
            ["human", "{input}"],
        ]);

        const chain = await createStuffDocumentsChain({
            llm: model,
            prompt,
        });

        const retrievalChain = await createRetrievalChain({
            combineDocsChain: chain,
            retriever,
        });

        const response = await retrievalChain.invoke({
            input: query,
            // chat_history: memory.chatHistory,
        });

        // memory.saveContext({ input: query }, { output: response.answer });

        let formattedResponse;
        try {
            const parsedAnswer = JSON.parse(response.answer);
            if (parsedAnswer.place || parsedAnswer.ticket) {
                const item = parsedAnswer.place || parsedAnswer.ticket;
                const itemType = parsedAnswer.place ? 'place' : 'ticket';
                formattedResponse = { [itemType]: item };
            } else if (parsedAnswer.message) {
                formattedResponse = { message: parsedAnswer.message };
            } else {
                formattedResponse = { message: "Unexpected response format. Please try again." };
            }
        } catch (error) {
            formattedResponse = { message: response.answer };
        }

        return NextResponse.json(formattedResponse);
    } catch (error) {
        console.error("Error processing request:", error);
        return NextResponse.json({ message: "An error occurred while processing your request." }, { status: 500 });
    }
}
