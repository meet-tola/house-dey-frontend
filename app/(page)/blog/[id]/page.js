import BlogDetail from "@/components/BlogDetails";

const post = {
  id: 1,
  title: "Average Price of Apartments for Rent in Lagos, Nigeria.",
  content: `
    <div class="bg-gray-50 p-6">

    <!-- Container -->
    <div class="max-w-4xl mx-auto mt-6">
        <!-- Introduction -->
        <div class="mb-6">
            <h2 class="text-xl font-semibold text-gray-800 mb-4">Introduction</h2>
            <p class="text-gray-700">
                Lagos, being the commercial hub of Nigeria, has a vibrant rental market driven by its large working population. This blog explores factors influencing rental prices and provides insights into the real estate market.
            </p>
        </div>

        <!-- Overview of Lagos Real Estate Market -->
        <div class="mb-6">
            <h2 class="text-xl font-semibold text-gray-800 mb-4">Overview of Lagos Real Estate Market</h2>
            <ul class="list-disc list-inside text-gray-700">
                <li>High demand due to economic opportunities.</li>
                <li>Limited supply in prime locations like Ikoyi and Victoria Island.</li>
                <li>Growth in luxury segments, especially on the islands.</li>
                <li>Emerging submarkets in Ajah, Sangotedo, and mainland areas.</li>
            </ul>
        </div>

        <!-- Factors Affecting Rental Prices -->
        <div class="mb-6">
            <h2 class="text-xl font-semibold text-gray-800 mb-4">Factors Affecting Rental Prices</h2>
            <ul class="list-disc list-inside text-gray-700">
                <li><span class="font-medium">Location:</span> Proximity to business districts and amenities.</li>
                <li><span class="font-medium">Security:</span> Gated communities command higher prices.</li>
                <li><span class="font-medium">Power Supply:</span> Reliable electricity impacts rent.</li>
                <li><span class="font-medium">Property Condition:</span> Newer and modern apartments are costlier.</li>
                <li><span class="font-medium">Legal Environment:</span> Areas with clearer property rights have higher rates.</li>
            </ul>
        </div>

        <!-- Average Prices by Apartment Type -->
        <div class="mb-6">
            <h2 class="text-xl font-semibold text-gray-800 mb-4">Average Prices by Apartment Type</h2>
            <ul class="list-disc list-inside text-gray-700">
                <li><span class="font-medium">Studio Apartments:</span> ₦600,000 - ₦2,500,000/year</li>
                <li><span class="font-medium">One-Bedroom:</span> ₦200,000 - ₦4,000,000/year</li>
                <li><span class="font-medium">Two-Bedroom:</span> ₦800,000 - ₦7,000,000/year</li>
                <li><span class="font-medium">Three-Bedroom:</span> ₦2,500,000 - ₦12,000,000/year</li>
                <li><span class="font-medium">Luxury Apartments:</span> ₦15,000,000+/year</li>
            </ul>
        </div>

        <!-- Major Areas and Prices -->
        <div class="mb-6">
            <h2 class="text-xl font-semibold text-gray-800 mb-4">Major Areas and Prices</h2>
            <ul class="list-disc list-inside text-gray-700">
                <li><span class="font-medium">Ikoyi:</span> ₦2,500,000 - ₦12,000,000/year</li>
                <li><span class="font-medium">Victoria Island:</span> ₦2,000,000 - ₦10,000,000/year</li>
                <li><span class="font-medium">Surulere:</span> ₦500,000 - ₦2,500,000/year</li>
                <li><span class="font-medium">Ajah:</span> ₦400,000 - ₦2,500,000/year</li>
            </ul>
        </div>

        <!-- Tips for Renting in Lagos -->
        <div>
            <h2 class="text-xl font-semibold text-gray-800 mb-4">Tips for Renting in Lagos</h2>
            <p class="text-gray-700">
                Avoid scams by working with verified agents. Platforms like HouseDey can help connect property seekers with trusted professionals.
            </p>
        </div>
    </div>
</div>
  `,
  image: "https://cdn.businessday.ng/2022/11/housing-2.png",
  date: "2024-02-15",
  author: "Jane Doe",
};

export default function BlogPostPage() {
  return <BlogDetail post={post} />;
}
