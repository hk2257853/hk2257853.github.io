/**
 * Contact Data
 * Rendered as the HTTP Response body.
 */

export const contact = {
  email: 'harshwork474@gmail.com',
  linkedin: 'https://www.linkedin.com/in/harsh-k-64638a1b4/',
  github: 'https://github.com/hk2257853',
  phone: '+91 9175815437',
  resumeUrl: '/Harsh_Kumar_Resume.pdf',

  // Custom response headers - personality & credentials
  responseHeaders: {
    'Content-Type': 'application/human',
    'X-Status': 'Open to opportunities',
    'X-Location': 'India (open to relocation)',
    'X-ICPC': 'Regionalist (Rank 221)',
    'X-CodeChef': '1704 (3★)',
    'X-Philosophy': 'Build. Automate. Experiment.',
  },
} as const;

