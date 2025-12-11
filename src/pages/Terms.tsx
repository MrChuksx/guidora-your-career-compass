import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { BeamsBackground } from "@/components/ui/beams-background";

const Terms = () => {
  return (
    <BeamsBackground intensity="subtle" className="bg-background">
      <Navbar />
      <main className="flex-1 py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>
          <p className="text-muted-foreground mb-8">Last updated: December 11, 2025</p>

          <div className="prose prose-lg dark:prose-invert max-w-none space-y-8">
            <section>
              <h2 className="text-2xl font-semibold mb-4">1. Acceptance of Terms</h2>
              <p className="text-muted-foreground">
                By accessing and using Guidora, you accept and agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our platform.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">2. Description of Service</h2>
              <p className="text-muted-foreground">
                Guidora is a mentorship platform that connects students with experienced mentors across various fields. We facilitate the connection but do not guarantee any specific outcomes from mentorship relationships.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">3. User Accounts</h2>
              <p className="text-muted-foreground mb-4">To use our services, you must:</p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>Be at least 18 years old or have parental consent</li>
                <li>Provide accurate and complete registration information</li>
                <li>Maintain the security of your account credentials</li>
                <li>Notify us immediately of any unauthorized access</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">4. User Conduct</h2>
              <p className="text-muted-foreground mb-4">You agree not to:</p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>Use the platform for any unlawful purpose</li>
                <li>Harass, abuse, or harm other users</li>
                <li>Share false or misleading information</li>
                <li>Attempt to gain unauthorized access to our systems</li>
                <li>Use the platform to spam or solicit users</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">5. Intellectual Property</h2>
              <p className="text-muted-foreground">
                All content and materials on Guidora, including but not limited to text, graphics, logos, and software, are the property of Guidora or its licensors and are protected by intellectual property laws.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">6. Limitation of Liability</h2>
              <p className="text-muted-foreground">
                Guidora shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of the platform or any mentorship relationships formed through it.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">7. Contact</h2>
              <p className="text-muted-foreground">
                For questions about these Terms of Service, please contact us at legal@guidora.com.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </BeamsBackground>
  );
};

export default Terms;
