// import { ChatOpenAI } from "@langchain/openai";
// import * as dotenv from "dotenv";
// dotenv.config();
// import { ChatPromptTemplate } from "@langchain/core/prompts";
// import { createStuffDocumentsChain } from "langchain/chains/combine_documents"
// import { RecursiveCharacterTextSplitter } from "langchain/text_splitter"
// import { OpenAIEmbeddings } from "@langchain/openai";
// import { MemoryVectorStore } from 'langchain/vectorstores/memory'
// import { createRetrievalChain } from "langchain/chains/retrieval"
// import { JSONLoader } from "langchain/document_loaders/fs/json";

// export async function GET() {
//     const model = new ChatOpenAI({
//         modelName: "gpt-3.5-turbo",
//         temperature: 0.7,
//     })
//     const loader = new JSONLoader("./app/api/test/items.json")
//     const doc = await loader.load();
//     // console.log(doc);
//     const splitter = new RecursiveCharacterTextSplitter({
//         chunkSize: 200,
//         chunkOverlap: 20,
//     })
//     const splitDocs = await splitter.splitDocuments(doc);
//     // console.log(splitDocs);
//     const embeddings = new OpenAIEmbeddings();
//     const vectorStore = await MemoryVectorStore.fromDocuments(
//         splitDocs,
//         embeddings
//     )
//     const retriever = vectorStore.asRetriever({
//         k: 2,  
//     })
//     const prompt = ChatPromptTemplate.fromMessages([
//         ["system", "You are a store attendee, Use the following pieces of context which is list of available items with details to answer the customer's question at the end. All prices are in Rupee, If you don't know the answer, just say that sorry i am not aware, don't try to make up an answer. {context}."],
//         ["user", "{input}"],
//     ])
//     const chain = await createStuffDocumentsChain({
//         llm: model,
//         prompt,
//     })

//     // instiantiate the retrival chain
//     const retrievalChain = await createRetrievalChain({
//         combineDocsChain: chain,
//         retriever,
//     })

//     // call the chain and print the output
//     const response = await retrievalChain.invoke({ input: "you have Chickpea? tell me everything", context: doc });
//     console.log(response);


//     return Response.json({ message: response });
// }


// import { ChatOpenAI } from "@langchain/openai";
// import * as dotenv from "dotenv";
// dotenv.config();
// import { ChatPromptTemplate } from "@langchain/core/prompts";
// import { createStuffDocumentsChain } from "langchain/chains/combine_documents"
// import { RecursiveCharacterTextSplitter } from "langchain/text_splitter"
// import { OpenAIEmbeddings } from "@langchain/openai";
// import { MemoryVectorStore } from 'langchain/vectorstores/memory'
// import { createRetrievalChain } from "langchain/chains/retrieval"
// import { JSONLoader } from "langchain/document_loaders/fs/json";

// export async function GET() {
//     const model = new ChatOpenAI({
//         modelName: "gpt-3.5-turbo",
//         temperature: 0.3,
//     })
//     const loader = new JSONLoader("./app/api/test/items.json")
//     const doc = await loader.load();

//     const splitter = new RecursiveCharacterTextSplitter({
//         chunkSize: 500,
//         chunkOverlap: 50,
//     })
//     const splitDocs = await splitter.splitDocuments(doc);

//     const embeddings = new OpenAIEmbeddings();
//     const vectorStore = await MemoryVectorStore.fromDocuments(
//         splitDocs,
//         embeddings
//     )
//     const retriever = vectorStore.asRetriever({
//         k: 5,
//     })

//     const prompt = ChatPromptTemplate.fromMessages([
//         ["system", `You are a knowledgeable store attendant. Use the following product information to answer customer questions accurately and suggest products when appropriate. All prices are in Indian Rupees.

//         Remember:
//         1. Only provide information that is explicitly stated in the product details.
//         2. If asked about availability, assume all listed products are in stock unless stated otherwise.
//         3. Do not invent or assume any information not present in the product details.
//         4. If asked to compare products, only do so if you have information on all mentioned products.
//         5. Always mention the price when discussing a product.
//         6. If asked about features or specifications, provide all relevant details from the product information.
//         7. When suggesting a product, format your response as a JSON object with a "product" key containing ALL product details exactly as they appear in the original JSON, including id, title, slug, price, imageUrl, itemUrl, description, specifications, ratings, and reviews.
//         8. For general responses or when not suggesting a specific product, format your response as a JSON object with a "message" key.
//         9. Do not modify, omit, or add any fields when returning a product suggestion.

//         Product Information: {context}`],
//         ["human", "{input}"],
//     ])

//     const chain = await createStuffDocumentsChain({
//         llm: model,
//         prompt,
//     })

//     const retrievalChain = await createRetrievalChain({
//         combineDocsChain: chain,
//         retriever,
//     })

//     const response = await retrievalChain.invoke({
//         input: "how's your day going?",
//         context: doc
//     });

//     console.log(response);

//     // Parse the response and format it accordingly
//     let formattedResponse;
//     try {
//         const parsedAnswer = JSON.parse(response.answer);
//         if (parsedAnswer.product) {
//             // Verify that all required fields are present
//             const requiredFields = [
//                 "id", "title", "slug", "price", "imageUrl", "itemUrl",
//                 "description", "specifications", "ratings", "reviews"
//             ];
//             const hasAllFields = requiredFields.every(field => field in parsedAnswer.product);

//             if (hasAllFields) {
//                 formattedResponse = { product: parsedAnswer.product };
//             } else {
//                 formattedResponse = { message: "Product suggestion was incomplete. Please try again." };
//             }
//         } else if (parsedAnswer.message) {
//             formattedResponse = { message: parsedAnswer.message };
//         } else {
//             formattedResponse = { message: "Unexpected response format. Please try again." };
//         }
//     } catch (error) {
//         formattedResponse = { message: response.answer };
//     }

//     return Response.json(formattedResponse);
// }

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

// import { v4 as uuidv4 } from 'uuid';

// Initialize Pinecone client
const pinecone = new PineconeClient();



// Function to get the existing vector store

async function getVectorStore() {
    const pineconeIndex = pinecone.Index(process.env.PINECONE_INDEX);
    const embeddings = new OpenAIEmbeddings({
        model: "text-embedding-3-large",
    });

    return await PineconeStore.fromExistingIndex(embeddings, { pineconeIndex });
}

export async function POST(request) {
    try {
        const { query } = await request.json();

        // const vectorStore = await initializeVectorStore();
        const vectorStore = await getVectorStore();

        const model = new ChatOpenAI({
            modelName: "gpt-3.5-turbo",
            temperature: 0.3,
        });

        const retriever = vectorStore.asRetriever({
            k: 5,
        });

        const prompt = ChatPromptTemplate.fromMessages([
            ["system", `You are a knowledgeable store attendant. Use the following product information to answer customer questions accurately and suggest products when appropriate. All prices are in Indian Rupees.

        Remember:
        1. Only provide information that is explicitly stated in the product details.
        2. If asked about availability, assume all listed products are in stock unless stated otherwise.
        3. Do not invent or assume any information not present in the product details.
        4. If asked to compare products, only do so if you have information on all mentioned products.
        5. Always mention the price when discussing a product.
        6. If asked about features or specifications, provide all relevant details from the product information.
        7. When suggesting a product, format your response as a JSON object with a "product" key containing ALL product details exactly as they appear in the original JSON, including id, title, slug, price, imageUrl, itemUrl, description, specifications, ratings, and reviews.
        8. For general responses or when not suggesting a specific product, format your response as a JSON object with a "message" key.
        9. Do not modify, omit, or add any fields when returning a product suggestion.
        10. Strictly follow names in json file for product details, For example if user says show me bananas, you should return the product "banana" if it is in json not "Bananas".

        Product Information: {context}`],
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
        });

        console.log(response);

        // Parse the response and format it accordingly
        let formattedResponse;
        try {
            const parsedAnswer = JSON.parse(response.answer);
            if (parsedAnswer.product) {
                const requiredFields = [
                    "id", "title", "slug", "price", "imageUrl", "itemUrl",
                    "description", "specifications", "ratings", "reviews"
                ];
                const hasAllFields = requiredFields.every(field => field in parsedAnswer.product);

                if (hasAllFields) {
                    formattedResponse = { product: parsedAnswer.product };
                } else {
                    formattedResponse = { message: "Product suggestion was incomplete. Please try again." };
                }
            } else if (parsedAnswer.message) {
                formattedResponse = { message: parsedAnswer.message };
            } else {
                formattedResponse = { message: "Unexpected response format. Please try again." };
            }

        } catch (error) {
            formattedResponse = { type: 'message', data: response.answer };
        }

        return NextResponse.json(formattedResponse);
    } catch (error) {
        console.error("Error processing request:", error);
        return NextResponse.json({ type: 'message', data: "An error occurred while processing your request." }, { status: 500 });
    }
}