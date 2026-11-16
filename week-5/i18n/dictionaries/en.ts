import type { Dictionary } from './nl';

const en: Dictionary = {
  meta: {
    title: 'ACME — Smart solutions',
    description: 'ACME delivers clear, reliable solutions for modern teams.',
    contactDescription: 'Get in touch with ACME.',
  },
  nav: {
    home: 'Home',
    products: 'Products',
    contact: 'Contact',
    main: 'Main navigation',
    footer: 'Footer navigation',
    homeLabel: 'ACME homepage',
    language: 'Language',
  },
  footer: { rights: 'All rights reserved.' },
  home: {
    imageAlt: 'Various ACME packages and a shopping bag',
    eyebrow: 'Welcome to ACME',
    title: 'Everything you need, in one place',
    text: 'Discover the ACME product range. Practical products, carefully selected and clearly presented.',
    viewProducts: 'View products',
    contactUs: 'Get in touch',
  },
  products: {
    title: 'Products',
    subtitle: 'Browse our complete range.',
    emptyTitle: 'There are no products yet',
    emptyText: 'Add a product through the admin area.',
    view: 'View product',
    back: '← Back to all products',
    notFoundTitle: 'Product not found',
    notFoundText:
      'The product you are looking for does not exist or is no longer available.',
    backToProducts: 'Back to products',
  },
  contact: {
    eyebrow: 'We are happy to help',
    title: 'Contact',
    text: 'Fill in the form. We reply within one working day.',
    name: 'Name',
    email: 'Email address',
    message: 'Message',
    send: 'Send',
    companyDetails: 'Company details',
    notice:
      'This form has no submit logic yet. The browser only checks the required fields.',
  },
  notFound: {
    title: 'Page not found',
    text: 'The page you are looking for does not exist or has moved.',
    backHome: 'Back to home',
  },
};

export default en;
