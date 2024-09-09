import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function PrivacyPolicy() {
  return (
    <div className="container mx-auto py-8 mt-16">
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center">Privacy Policy</CardTitle>
        </CardHeader>
        <CardContent className="prose dark:prose-invert max-w-none">
          <p className="text-muted-foreground text-center mb-6">Last updated: {new Date().toLocaleDateString()}</p>
          
          <section className="mb-6">
            <h2 className="text-2xl font-semibold mb-2">1. Introduction</h2>
            <p>Welcome to [Your Company Name] ("we", "our", or "us"). We are committed to protecting your personal information and your right to privacy. This privacy policy describes how we collect, use, and share your information when you use our services.</p>
          </section>

          <section className="mb-6">
            <h2 className="text-2xl font-semibold mb-2">2. Information We Collect</h2>
            <p>We collect information that you provide directly to us, such as when you create an account, use our services, or communicate with us. This may include:</p>
            <ul className="list-disc pl-6">
              <li>Name and contact information</li>
              <li>Account credentials</li>
              <li>Payment information</li>
              <li>Communication preferences</li>
            </ul>
          </section>

          <section className="mb-6">
            <h2 className="text-2xl font-semibold mb-2">3. How We Use Your Information</h2>
            <p>We use your information to:</p>
            <ul className="list-disc pl-6">
              <li>Provide, maintain, and improve our services</li>
              <li>Process transactions and send related information</li>
              <li>Send you technical notices, updates, security alerts, and support messages</li>
              <li>Respond to your comments, questions, and customer service requests</li>
            </ul>
          </section>

          <section className="mb-6">
            <h2 className="text-2xl font-semibold mb-2">4. Sharing of Information</h2>
            <p>We may share your information with:</p>
            <ul className="list-disc pl-6">
              <li>Service providers who perform services on our behalf</li>
              <li>Professional advisors, such as lawyers and accountants</li>
              <li>Authorities when required by law or to protect our rights</li>
            </ul>
          </section>

          <section className="mb-6">
            <h2 className="text-2xl font-semibold mb-2">5. Your Rights and Choices</h2>
            <p>You have certain rights regarding your personal information, including:</p>
            <ul className="list-disc pl-6">
              <li>Accessing and updating your information</li>
              <li>Opting out of marketing communications</li>
              <li>Requesting deletion of your personal information</li>
            </ul>
          </section>

          <section className="mb-6">
            <h2 className="text-2xl font-semibold mb-2">6. Security</h2>
            <p>We take reasonable measures to help protect your personal information from loss, theft, misuse, unauthorized access, disclosure, alteration, and destruction.</p>
          </section>

          <section className="mb-6">
            <h2 className="text-2xl font-semibold mb-2">7. Changes to This Privacy Policy</h2>
            <p>We may update this privacy policy from time to time. We will notify you of any changes by posting the new privacy policy on this page.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-2">8. Contact Us</h2>
            <p>If you have any questions about this privacy policy, please contact us at:</p>
            <p>[Your Company Name]<br />
            [Your Address]<br />
            Email: [Your Email]<br />
            Phone: [Your Phone Number]</p>
          </section>
        </CardContent>
      </Card>
    </div>
  )
}