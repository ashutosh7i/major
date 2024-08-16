import { Button } from "@/components/ui/button";
import items from "@/app/api/bot/items.json";
import { Star } from "lucide-react";

const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
        if (i <= rating) {
            stars.push(<Star fill="yellow" strokeWidth={0.5} key={i} className="w-5 h-5 fill-primary" />);
        } else if (i - rating < 1) {
            stars.push(<Star fill="yellow" strokeWidth={0.5} key={i} className="w-5 h-5 fill-primary" style={{ clipPath: 'inset(0 50% 0 0)' }} />);
        } else {
            stars.push(<Star fill="yellow" strokeWidth={0.5} key={i} className="w-5 h-5 fill-muted stroke-muted-foreground" />);
        }
    }
    return stars;
};

const Reviews = ({ reviews }) => {
    return (
        <div className="flex flex-col h-screen pt-20 px-4 md:px-0">
            <h2 className="text-2xl md:text-3xl font-bold">Customer Reviews</h2>
            <div className="mt-6 grid gap-6">
                {reviews.map((review) => (
                    <div key={review.id} className="bg-gray-100 p-4 rounded-lg shadow-md">
                        <div className="flex items-center gap-2">
                            <div className="flex items-center gap-1">
                                {renderStars(review.rating)}
                            </div>
                            <p className="text-muted-foreground">{review.rating} out of 5</p>
                        </div>
                        <p>{review.review}</p>
                        <p className="text-muted-foreground text-sm">- {review.name ? review.name : "Anonymous"}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

const ProductPage = ({ params: { slug } }) => {
    const item = items.find((item) => item.slug === slug);
    if (!item) {
        return <p>Product not found</p>;
    }
    return (
        <div className="container mx-auto p-4">
            <div className="container mx-auto px-4 md:px-6 py-12 md:py-16 bg-gradient-to-r from-blue-100 via-white to-blue-100 rounded-lg shadow-lg">
                <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-start">
                    <div className="flex justify-center">
                        <img
                            src={item.imageUrl || "/placeholder.svg"}
                            width={200}
                            height={200}
                            alt={item.title}
                        // className="w-full max-w-[200px] md:max-w-[300px] rounded-lg object-cover shadow-md"
                        />
                    </div>
                    <div className="grid gap-6">
                        <div>
                            <h1 className="text-3xl md:text-4xl font-bold text-gray-800">{item.title}</h1>
                            <p className="text-2xl font-semibold mt-2 text-primary">₹{item.price}</p>
                        </div>
                        <div className="grid gap-4">
                            <p className="text-gray-600">
                                {item.description}
                            </p>
                        </div>
                        <div className="grid gap-4">
                            <p className="text-gray-600">
                                {item.specifications}
                            </p>
                        </div>
                        <div className="flex flex-col md:flex-row gap-4 pt-10">
                            <Button size="lg" className="flex-1 bg-primary text-white rounded-lg shadow-lg hover:bg-primary-dark">
                                Add to Cart
                            </Button>
                            <Button size="lg" variant="outline" className="flex-1 border-primary text-primary rounded-lg shadow-lg hover:bg-primary hover:text-white">
                                Buy Now
                            </Button>
                        </div>
                    </div>
                </div>
                <div className="mt-12 md:mt-16 grid gap-8">
                    <Reviews reviews={item.reviews} />
                </div>
            </div>
        </div>
    );
};

export default ProductPage;