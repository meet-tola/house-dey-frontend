import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export default function PrivacyPolicy() {
  return (
    <div className="container mx-auto py-8 mt-16">
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center">
            HouseDey Privacy Policy
          </CardTitle>
        </CardHeader>
        <CardContent className="prose dark:prose-invert max-w-none">
          <p className="text-muted-foreground text-center mb-6">
            Last updated: {new Date().toLocaleDateString()}
          </p>

          <section className="mb-6">
            <h2 className="text-2xl font-semibold mb-2">1. Introduction</h2>
            <p>
              This privacy policy outlines our agreement with anyone (also
              referred to as ‘you or your’) who uses our platform, (also
              referred to as HouseDey, Us, Our & We), and it applies from the
              moment you engage the platform. It contains information on how we
              collect, use, and share your data, including inferred data,
              observed data and personal data when you use our services. We are
              committed to protecting your personal information and your right
              to privacy as long as the law permits—the law here includes the
              law of the territory we are based in and the territory you are
              when using HouseDey.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-2xl font-semibold mb-2">
              2. Information We Collect
            </h2>
            <p>
              We collect information that you provide directly to us and also
              data that’s logged in our database from your activities, such as
              when you create an account, use our services, or communicate with
              us. This may include but not limited to:
            </p>
            <ul className="list-disc pl-6">
              <li>Name and contact information</li>
              <li>Account credentials</li>
              <li>Payment information</li>
              <li>Communication preferences</li>
              <li>Usage Stats</li>
            </ul>
          </section>

          <section className="mb-6">
            <h2 className="text-2xl font-semibold mb-2">
              3. How We Use Your Information
            </h2>
            <p>We use your information to:</p>
            <ul className="list-disc pl-6">
              <li>Provide, maintain, and improve our services</li>
              <li>Process transactions and send related information</li>
              <li>
                Send you technical notices, updates, security alerts, and
                support messages
              </li>
              <li>
                Respond to your comments, questions, and customer service
                requests
              </li>
              <li>
                Ensure that our platform is used within the bounds of law.
              </li>
            </ul>
          </section>

          <section className="mb-6">
            <h2 className="text-2xl font-semibold mb-2">
              4. Sharing of Information
            </h2>
            <p>We may share your information with:</p>
            <ul className="list-disc pl-6">
              <li>
                Third parties who may or may not represent us like advertising
                agencies.
              </li>
              <li>Professional advisors, such as lawyers and accountants</li>
              <li>Authorities when required by law or to protect our rights</li>
            </ul>
            <p>
              Except <b>expressly</b> mandated by law, we would always anonymize
              your data before sharing to ensure that your privacy is
              maintained.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-2xl font-semibold mb-2">
              5. Your Rights and Choices
            </h2>
            <p>
              You have certain rights regarding your personal information,
              including:
            </p>
            <ul className="list-disc pl-6">
              <li>Accessing and updating your information</li>
              <li>Opting out of marketing communications</li>
              <li>Requesting deletion of your personal information</li>
            </ul>
          </section>

          <section className="mb-6">
            <h2 className="text-2xl font-semibold mb-2">6. Security</h2>
            <p>
              We take reasonable measures to help protect your personal
              information from loss, theft, misuse, unauthorized access,
              disclosure, alteration, and destruction. This we do by encryption
              when necessary, hashing of secret credentials and non-disclosure
              of codes that may reveal PIIs.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-2xl font-semibold mb-2">
              7. Changes to This Privacy Policy
            </h2>
            <p>
              We may update this privacy policy from time to time. When we make
              a new change, we would notify you of it before you are allowed to
              continue using our platform.
            </p>
          </section>
          <section className="mb-6">
            <h2 className="text-2xl font-semibold mb-2">
              8. Data Retention and Deletion
            </h2>
            <p>
              We don’t completely own the entire infrastructure we use. These
              includes servers, software, data centers, etc. and as such we
              can’t completely assure you that any of your data that might be
              stored in any of our providers’ platforms would be deleted when we
              delete them from our systems, but however, to ensure that your
              data is further safe, we will use service providers that are
              reputable and their privacy policies transparent, furthermore, we
              would ensure that we minimize the amount of your data that is
              stored on the systems of our service providers so that we could
              have more control of your data for deletion purposes.
            </p>
            <p>
              Also, your data might be kept on our systems for longer than
              expected but not longer than the law permits. Typically, when you
              request that your data is deleted, it stays on our systems for
              about 60 days unless for audit reasons, which may cause us to
              store it for longer.
            </p>
            <p>
              By agreeing to our privacy policy, you agree that you have read,
              duly understood and accepted all that’s written here. For further
              information, send us a contact message.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-2">8. Contact Us</h2>
            <p>
              If you have any questions about this privacy policy, please
              contact us at:
            </p>
            <Link href="/support" className="text-blue-600 hover:underline">
              Support Page
            </Link>
          </section>
        </CardContent>
      </Card>
    </div>
  );
}
