import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { BeamsBackground } from "@/components/ui/beams-background";

const Privacy = () => {
  return (
    <BeamsBackground intensity="subtle" className="bg-background">
      <Navbar />
      <main className="flex-1 py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
          <p className="text-muted-foreground mb-8">Last updated: December 11, 2025</p>

          <div className="prose prose-lg dark:prose-invert max-w-none space-y-8">
            <section>
              <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
              <p className="text-muted-foreground">
                Welcome to Guidora. We are committed to protecting your personal information and your right to privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our platform.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">2. Information We Collect</h2>
              <p className="text-muted-foreground mb-4">We collect information that you provide directly to us, including:</p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>Name, email address, and contact information</li>
                <li>Profile information such as bio, skills, and expertise</li>
                <li>Communication data between mentors and students</li>
                <li>Session booking and availability information</li>
                <li>Payment information for premium services</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">3. How We Use Your Information</h2>
              <p className="text-muted-foreground mb-4">We use the information we collect to:</p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>Provide, maintain, and improve our services</li>
                <li>Match students with appropriate mentors</li>
                <li>Facilitate communication between users</li>
                <li>Send notifications about sessions and messages</li>
                <li>Respond to your inquiries and support requests</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">4. Information Sharing</h2>
              <p className="text-muted-foreground">
                We do not sell your personal information. We may share your information with third parties only in the following circumstances: with your consent, to comply with legal obligations, or to protect our rights and safety.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">5. Data Security</h2>
              <p className="text-muted-foreground">
                We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">6. Contact Us</h2>
              <p className="text-muted-foreground">
                If you have any questions about this Privacy Policy, please contact us at privacy@guidora.com.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </BeamsBackground>
  );
};

export default Privacy;
