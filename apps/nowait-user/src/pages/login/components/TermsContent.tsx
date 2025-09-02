import {
  ServiceTermsContent,
  MarketingTermsContent,
  PrivacyTermsContent,
} from "./Term";

interface TermsContentProps {
  termType: "service" | "privacy" | "marketing";
}

const TermsContent = ({ termType }: TermsContentProps) => {
  switch (termType) {
    case "service":
      return <ServiceTermsContent />;
    case "privacy":
      return <PrivacyTermsContent />;
    case "marketing":
      return <MarketingTermsContent />;
    default:
      return <ServiceTermsContent />;
  }
};

export default TermsContent;
