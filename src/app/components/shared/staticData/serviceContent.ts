import { Lender, PaymentProvider, ServiceContentConfig, Testimonial } from "@/app/types/services/services";

const educationalLoanLenders: Lender[] = [
  {
    id: 'bank-a',
    name: 'First Bank Education Loans',
    logo: '/images/lenders/first-bank.png',
    description: 'Comprehensive education financing for Nigerian students',
    interestRate: '12-15% per annum',
    maxAmount: '₦10,000,000',
    processingTime: '2-3 weeks',
    requirements: ['Admission letter', 'Guarantor', 'Collateral', 'Bank statements'],
    website: 'https://firstbank.com/education-loans'
  },
  {
    id: 'bank-b',
    name: 'GTBank Student Loans',
    logo: '/images/lenders/gtbank.png',
    description: 'Flexible student loan options with competitive rates',
    interestRate: '10-13% per annum',
    maxAmount: '₦15,000,000',
    processingTime: '1-2 weeks',
    requirements: ['University admission', 'Parent/Guardian as guarantor', 'Salary account'],
    website: 'https://gtbank.com/student-loans'
  }
];

const schoolFeesPaymentProviders: PaymentProvider[] = [
  {
    id: 'flutterwave',
    name: 'Flutterwave School Payments',
    logo: '/images/providers/flutterwave.png',
    description: 'Direct school fee payments with instant confirmation',
    fees: '1.4% transaction fee',
    processingTime: 'Instant',
    supportedCountries: ['Nigeria', 'Ghana', 'Kenya', 'South Africa'],
    website: 'https://flutterwave.com/education'
  },
  {
    id: 'paystack',
    name: 'Paystack Education',
    logo: '/images/providers/paystack.png',
    description: 'Secure education payments with multiple payment options',
    fees: '1.5% transaction fee',
    processingTime: 'Instant',
    supportedCountries: ['Nigeria', 'Ghana'],
    website: 'https://paystack.com/education'
  }
];

const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Adebayo Ogundimu',
    role: 'University of Lagos Graduate',
    content: 'The education loan process was seamless. I got my funding within 2 weeks and could focus on my studies without financial stress.',
    rating: 5
  },
  {
    id: '2',
    name: 'Fatima Ibrahim',
    role: 'Masters Student',
    content: 'Paying my school fees through this platform was so convenient. The instant confirmation gave me peace of mind.',
    rating: 5
  }
];

export const serviceContentConfig: Record<string, ServiceContentConfig> = {
  'educational-loan': {
    slug: 'educational-loan',
    layoutType: 'tabs',
    customContent: {
      overview: `
        Our educational loan service connects you with trusted lenders offering 
        competitive rates for your academic journey. Whether you're pursuing 
        undergraduate, postgraduate, or professional courses, we help you find 
        the right financing solution.
      `,
      lenders: educationalLoanLenders,
      testimonials: testimonials,
      guides: {
        title: 'How to Apply for an Education Loan',
        steps: [
          'Research and compare different lenders based on interest rates, terms, and requirements',
          'Gather required documents including admission letter, academic transcripts, and financial statements',
          'Submit your application with a qualified guarantor or collateral',
          'Wait for loan approval and review terms carefully',
          'Accept the loan offer and complete disbursement procedures',
          'Begin repayment according to the agreed schedule'
        ]
      },
      faqs: [
        {
          question: 'What is the maximum loan amount I can get?',
          answer: 'Loan amounts vary by lender, typically ranging from ₦500,000 to ₦15,000,000 depending on the course and institution.'
        },
        {
          question: 'Do I need a guarantor?',
          answer: 'Yes, most lenders require a guarantor who is either a parent, guardian, or someone with stable income and good credit history.'
        }
      ]
    }
  },

  'school-fees-payment': {
    slug: 'school-fees-payment',
    layoutType: 'simple',
    customContent: {
      overview: `
        Pay your school fees directly and securely through our trusted payment partners. 
        Get instant confirmation and avoid the hassle of bank queues and delays.
      `,
      paymentProviders: schoolFeesPaymentProviders,
      guides: {
        title: 'How to Pay Your School Fees',
        steps: [
          'Select your preferred payment provider from the options below',
          'Enter your school details and student information',
          'Choose your payment method (card, bank transfer, or mobile money)',
          'Review payment details and confirm transaction',
          'Receive instant payment confirmation and receipt',
          'School receives notification of payment automatically'
        ]
      }
    }
  },

  'visa-consultation': {
    slug: 'visa-consultation',
    layoutType: 'tabs',
    customContent: {
      overview: `
        Get expert visa consultation services for study abroad applications. 
        Our experienced consultants help you navigate the complex visa process 
        with personalized guidance and support.
      `,
      testimonials: [
        {
          id: '3',
          name: 'Michael Adeyemi',
          role: 'UK Student Visa Recipient',
          content: 'The visa consultation was thorough and professional. I got my UK student visa approved on the first try!',
          rating: 5
        }
      ],
      guides: {
        title: 'Visa Application Process',
        steps: [
          'Book a consultation session with our visa experts',
          'Prepare required documents based on your destination country',
          'Complete visa application forms with expert guidance',
          'Schedule and prepare for visa interview (if required)',
          'Submit application and track progress',
          'Receive visa decision and travel preparation advice'
        ]
      }
    }
  }
};