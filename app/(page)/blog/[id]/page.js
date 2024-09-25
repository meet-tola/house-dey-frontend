import BlogDetail from "@/components/BlogDetails";

const post = {
  id: 1,
  title: "10 Tips for First-Time Home Buyers",
  content: `
    <p>Buying your first home is an exciting milestone, but it can also be overwhelming. Here are 10 essential tips to help you navigate the process:</p>
    <ol>
      <li><strong>Get your finances in order:</strong> Check your credit score, save for a down payment, and get pre-approved for a mortgage.</li>
      <li><strong>Determine your budget:</strong> Consider not just the mortgage payments, but also property taxes, insurance, and maintenance costs.</li>
      <li><strong>Make a list of must-haves:</strong> Decide what features are essential in your new home and what you're willing to compromise on.</li>
      <li><strong>Research neighborhoods:</strong> Look into crime rates, school districts, and proximity to amenities that matter to you.</li>
      <li><strong>Hire a reputable real estate agent:</strong> An experienced agent can guide you through the process and help you find the best deals.</li>
      <li><strong>Get a home inspection:</strong> This can reveal potential issues with the property before you buy.</li>
      <li><strong>Don't rush:</strong> Take your time to find the right home. Rushing can lead to buyer's remorse.</li>
      <li><strong>Consider future needs:</strong> Think about how long you plan to stay in the home and if it will meet your future needs.</li>
      <li><strong>Understand all costs involved:</strong> Be aware of closing costs, moving expenses, and potential renovation costs.</li>
      <li><strong>Don't forget about resale value:</strong> Even if you plan to stay long-term, consider factors that might affect the home's future value.</li>
    </ol>
    <p>Remember, buying a home is a significant investment. Take your time, do your research, and don't hesitate to ask questions throughout the process.</p>
  `,
  image: "https://via.placeholder.com/400x800",
  date: "2024-02-15",
  author: "Jane Doe",
};

export default function BlogPostPage() {
  return <BlogDetail post={post} />;
}
