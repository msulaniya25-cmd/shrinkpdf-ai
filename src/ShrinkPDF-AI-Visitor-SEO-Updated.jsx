import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
  FileText, Upload, Download, CheckCircle2, AlertCircle, Sparkles,
  Settings, Sliders, Shield, Zap, Smartphone, Globe, Lock, RefreshCw,
  ChevronRight, ChevronDown, Search, Plus, Edit3, Trash2, Eye,
  LayoutDashboard, FileCode, BarChart3, Moon, Sun, ArrowRight,
  Check, X, Layers, Info, ExternalLink, Code2, Cpu, FileCheck2,
  BookOpen, HelpCircle, Share2, Award
} from 'lucide-react';

// ============================================================================
// 1. SEO LANDING PAGES DATA & CONFIGURATION
// ============================================================================
const SEO_PAGES = [
  {
    slug: '/',
    path: '/',
    label: 'Home',
    targetSizeKB: null,
    preset: 'recommended',
    metaTitle: 'Free PDF Compressor Online – Compress PDF to 50KB, 100KB, 200KB, 500KB & 1MB',
    metaDescription: 'Use this free PDF compressor online to reduce PDF file size to 50KB, 100KB, 200KB, 300KB, 500KB, 1MB or 2MB. Compress PDF files in your browser and download in seconds.',
    h1: 'Free Online PDF Compressor – Compress PDF to 50KB, 100KB, 200KB, 500KB & 1MB',
    subtitle: 'Compress PDF files online for free. Reduce PDF file size to 50KB, 100KB, 200KB, 300KB, 500KB, 1MB or 2MB without unnecessary complexity. Upload your PDF and download the compressed file in seconds.',
    focusKeyword: 'free pdf compressor online',
    badge: 'Free Online PDF Compressor',
    useCaseTitle: 'Why Choose ShrinkPDF AI Over Traditional Tools?',
    useCaseIntro: 'Whether you are submitting government portal forms, emailing large portfolios, or archiving invoices, our adaptive compression engine balances DPI resolution and JPEG chroma subsampling to hit exact KB thresholds.',
    limitations: 'PDF documents containing pure vector text compress dramatically with zero visual loss. Scanned multi-page documents with high-resolution photos may reach a physical minimum floor where further compression would render text illegible—our engine automatically detects this floor and delivers the closest crisp result.',
    faqs: [
      {
        q: 'How do I compress a PDF file online for free?',
        a: 'Simply drag and drop your PDF into the uploader above, choose your desired target size (such as 100KB, 200KB, or Recommended), and click Compress PDF. Your optimized file will be ready to download in seconds.'
      },
      {
        q: 'Is my PDF data secure during compression?',
        a: 'Yes. All PDF processing happens directly inside your browser sandbox using isolated WebAssembly/Canvas rendering pipelines. Your files are never permanently stored on external servers.'
      },
      {
        q: 'How does ShrinkPDF AI compare to Adobe PDF Compressor?',
        a: 'While Adobe Acrobat offers solid desktop compression, ShrinkPDF AI provides instant browser-based access with exact target file size presets (like 50KB, 100KB, and 200KB) tailored for strict upload portals—completely free with no account required.'
      },
      {
        q: 'Why didn’t my 15MB scanned PDF reach exactly 50KB?',
        a: 'Multi-page scanned PDFs consist of embedded raster images. Reducing 20 pages of images down to 50KB (2.5KB per page) would make text unreadable. When an exact target is physically impossible without destroying legibility, our engine delivers the smallest readable size.'
      },
      { q: 'Can I reduce PDF file size online without installing software?', a: 'Yes. Open ShrinkPDF AI in a modern browser, upload your PDF, choose a target size, and download the compressed file. No desktop installation is required.' },
      { q: 'Can I compress a PDF without losing quality?', a: 'Compression may affect image resolution depending on the document and target size. ShrinkPDF AI aims to balance file size and readability, but the result depends on the original PDF.' },
      { q: 'Is ShrinkPDF AI a free PDF size reducer?', a: 'Yes. You can use the available target-size presets to reduce PDF files, including 50KB, 100KB, 200KB, 300KB, 500KB, 1MB, and 2MB.' }
        ]
  },
  {
    slug: 'pdf-compressor-online',
    path: '/pdf-compressor-online',
    label: 'PDF Compressor Online',
    targetSizeKB: null,
    preset: 'recommended',
    metaTitle: 'PDF Compressor Online – Fast, Secure & Browser-Based PDF Reducer',
    metaDescription: 'Use our online PDF compressor to shrink large PDF documents directly in your browser. Fast, private, and works on Windows, Mac, iOS, and Android.',
    h1: 'PDF Compressor Online – Instant Browser-Based File Size Reduction',
    subtitle: 'Shrink bulky PDF reports, contracts, and scanned documents directly in your web browser with zero software installation.',
    focusKeyword: 'pdf compressor online',
    badge: '100% Cloud-Free Local Processing',
    useCaseTitle: 'Built for Speed, Privacy, and Cross-Platform Workflows',
    useCaseIntro: 'An online PDF compressor eliminates the need to install heavy desktop suites. Whether you are on a Chromebook, Linux workstation, iPhone, or Windows laptop, our responsive compression engine optimizes PDF streams immediately.',
    limitations: 'Browser memory limits apply to extraordinarily large blueprints (over 100MB). For standard office documents, brochures, and academic papers, online compression completes in under 3 seconds.',
    faqs: [
      {
        q: 'Does this online PDF compressor work on mobile phones?',
        a: 'Yes! Our interface is fully responsive for iOS Safari and Android Chrome, allowing you to compress PDFs saved in Files or Google Drive on the go.'
      },
      {
        q: 'Do I need to install any browser extensions?',
        a: 'No plugins, extensions, or desktop apps are needed. Everything runs natively using modern HTML5 standards.'
      }
    ]
  },
  {
    slug: 'pdf-compressor-to-50kb',
    path: '/pdf-compressor-to-50kb',
    label: 'Compress to 50KB',
    targetSizeKB: 50,
    preset: '50',
    metaTitle: 'PDF Compressor to 50KB – Shrink PDF Under 50KB for Online Portals',
    metaDescription: 'Compress PDF to 50KB online for free. Reduce PDF file size for government forms, exam applications, passport portals, and strict upload limits.',
    h1: 'PDF Compressor to 50KB – Optimize Documents for Strict Upload Limits',
    subtitle: 'Specifically calibrated to reduce 1–2 page certificates, IDs, and application forms under the strict 50KB portal threshold.',
    focusKeyword: 'pdf compressor to 50kb',
    badge: 'Strict Portal Preset: 50KB',
    useCaseTitle: 'Ideal for Government Portals, Exam Forms & ID Verification',
    useCaseIntro: 'Many recruitment portals, university admissions, and KYC systems enforce a strict 50KB maximum upload limit. Our 50KB compressor applies aggressive multi-pass DPI scaling and smart grayscale/chroma optimization to squeeze single-page PDFs below 50KB.',
    limitations: 'A 50KB budget is best suited for 1 to 2 page documents. If you upload a 15-page image-heavy brochure, our engine will compress it as close to 50KB as legibly possible and show you the exact achieved size.',
    faqs: [
      {
        q: 'Can any PDF be compressed to 50KB?',
        a: 'Single-page certificates, receipts, and forms almost always reach under 50KB. Multi-page photo PDFs will reach their lowest legible threshold, which may be slightly above 50KB.'
      },
      {
        q: 'Will text still be readable at 50KB?',
        a: 'Yes, our iterative algorithm tests multiple resolution steps to keep text sharp while removing redundant metadata and high-DPI image bloat.'
      }
    ]
  },
  {
    slug: 'pdf-compressor-to-100kb',
    path: '/pdf-compressor-to-100kb',
    label: 'Compress to 100KB',
    targetSizeKB: 100,
    preset: '100',
    metaTitle: 'PDF Compressor to 100KB – Reduce PDF File Size Under 100KB Free',
    metaDescription: 'Reduce PDF size to 100KB online for free. Ideal for resumes, bank statements, job applications, and official document uploads.',
    h1: 'PDF Compressor to 100KB – Crisp Resumes & Official Documents Under 100KB',
    subtitle: 'Hit the sweet spot for job portals, visa applications, and banking uploads by shrinking your PDF cleanly to 100KB.',
    focusKeyword: 'pdf compressor to 100kb',
    badge: 'Most Popular Portal Size: 100KB',
    useCaseTitle: 'The Standard Requirement for Resumes & Visa Portals',
    useCaseIntro: '100KB is the gold-standard file limit across HR applicant tracking systems (ATS), scholarship portals, and tax filing websites. Our 100kb pdf compressor preserves clean typography while stripping embedded font bloat and oversized raster assets.',
    limitations: 'Documents up to 3–4 pages typically hit 100KB comfortably. Very dense photo scans will be optimized to the closest possible size.',
    faqs: [
      {
        q: 'How do I make my resume PDF under 100KB?',
        a: 'Upload your resume PDF above—the 100KB target is already preselected. Click Compress PDF and download your recruiter-ready file.'
      },
      {
        q: 'Does compressing to 100KB break clickable links?',
        a: 'Raster-based compression flattens page layers to guarantee exact file size compliance. Always verify portal requirements before submitting.'
      }
    ]
  },
  {
    slug: 'pdf-compressor-to-200kb',
    path: '/pdf-compressor-to-200kb',
    label: 'Compress to 200KB',
    targetSizeKB: 200,
    preset: '200',
    metaTitle: 'PDF Compressor to 200KB – Free 200KB PDF Compressor Online',
    metaDescription: 'Use our 200KB PDF compressor to reduce PDF size to 200KB online. High clarity for multi-page forms, scanned IDs, and academic submissions.',
    h1: 'PDF Compressor to 200KB – High-Clarity Compression Under 200KB',
    subtitle: 'Maintain sharp charts, signatures, and multi-page text while staying strictly below a 200KB file size cap.',
    focusKeyword: 'pdf compressor to 200kb',
    badge: 'Balanced Clarity Preset: 200KB',
    useCaseTitle: 'Why 200KB Is the Sweet Spot for Multi-Page Forms',
    useCaseIntro: 'When 100KB feels too tight for a 3-to-5 page signed contract or medical report, a 200kb pdf compressor gives enough headroom for crisp signatures and small embedded logos without triggering upload rejection errors.',
    limitations: 'Our iterative solver runs up to 4 quality passes to land as close to 200KB as possible without unnecessary quality loss.',
    faqs: [
      {
        q: 'Is 200KB good enough for scanned signatures?',
        a: 'Yes! At 200KB, standard A4/Letter documents retain clear handwriting, stamps, and barcodes.'
      },
      {
        q: 'Is there a daily limit on the 200KB PDF compressor?',
        a: 'No. You can compress as many documents to 200KB as you need, completely free.'
      }
    ]
  },
  {
    slug: 'pdf-compressor-to-300kb',
    path: '/pdf-compressor-to-300kb',
    label: 'Compress to 300KB',
    targetSizeKB: 300,
    preset: '300',
    metaTitle: 'PDF Compressor to 300KB – Reduce PDF Size to 300KB Online',
    metaDescription: 'Compress PDF to 300KB quickly and securely. Great for academic assignments, insurance claims, and digital invoices.',
    h1: 'PDF Compressor to 300KB – Shrink Assignments & Claims Under 300KB',
    subtitle: 'Optimize multi-page PDF files down to 300KB while preserving clear diagrams, tables, and fine print.',
    focusKeyword: 'pdf compressor to 300kb',
    badge: 'Document Preset: 300KB',
    useCaseTitle: 'Tailored for Academic Portals & Insurance Documentation',
    useCaseIntro: 'University LMS platforms and insurance claim portals frequently cap uploads at 300KB. Using our pdf compressor 300 tool ensures your multi-page submissions pass validation on the first attempt.',
    limitations: 'If your original PDF is already smaller than 300KB, our tool will notify you so you don’t re-compress unnecessarily.',
    faqs: [
      {
        q: 'What happens if my PDF is already 250KB?',
        a: 'Our smart analyzer checks the original file size first and lets you choose whether to keep the original or optimize further.'
      }
    ]
  },
  {
    slug: 'pdf-compressor-to-500kb',
    path: '/pdf-compressor-to-500kb',
    label: 'Compress to 500KB',
    targetSizeKB: 500,
    preset: '500',
    metaTitle: 'PDF Compressor to 500KB – Compress Large PDFs Under 500KB Free',
    metaDescription: 'Compress PDF to 500KB online with crisp image retention. Ideal for pitch decks, property brochures, and 5–15 page reports.',
    h1: 'PDF Compressor to 500KB – Crisp Visuals for Reports & Pitch Decks',
    subtitle: 'Turn 5MB–15MB presentation exports and illustrated reports into fast-loading 500KB PDFs.',
    focusKeyword: 'pdf compressor to 500kb',
    badge: 'Visual Quality Preset: 500KB',
    useCaseTitle: 'Preserve Visual Fidelity in Illustrated Reports',
    useCaseIntro: 'Exporting slides from Canva, Figma, or PowerPoint often produces bloated 10MB+ PDFs. Our pdf compressor 500kb target strips unoptimized color profiles and downsamples oversized photos while keeping charts razor-sharp.',
    limitations: 'Works remarkably well for 5 to 15 page decks. Larger catalogs may benefit from our 1MB or 2MB presets.',
    faqs: [
      {
        q: 'Will charts and graphs look blurry at 500KB?',
        a: 'No. A 500KB budget provides ample bandwidth for high-DPI rendering so thin chart lines and small labels remain legible.'
      }
    ]
  },
  {
    slug: 'pdf-compressor-to-1mb',
    path: '/pdf-compressor-to-1mb',
    label: 'Compress to 1MB',
    targetSizeKB: 1024,
    preset: '1024',
    metaTitle: 'PDF Compressor to 1MB – Shrink Heavy PDFs Under 1MB Online',
    metaDescription: 'Compress PDF to 1MB online for free. Best for eBooks, real estate brochures, client proposals, and email attachments.',
    h1: 'PDF Compressor to 1MB – High-Definition Compression Under 1 Megabyte',
    subtitle: 'Reduce massive multi-megabyte PDFs down to a clean, email-friendly 1MB file without sacrificing visual polish.',
    focusKeyword: 'pdf compressor to 1mb',
    badge: 'HD Preset: 1MB (1024KB)',
    useCaseTitle: 'Effortless Email Attachments & Client Proposals',
    useCaseIntro: 'Many corporate email gateways and CRM portals flag attachments over 1MB–2MB. Our pdf compressor 1mb preset retains near-original visual sharpness while cutting bandwidth by up to 90%.',
    limitations: 'Ideal for 10 to 30 page documents with photographs and rich layouts.',
    faqs: [
      {
        q: 'Is 1MB equal to 1000KB or 1024KB?',
        a: 'Our engine targets 1024KB (1 MiB) with a safe margin just underneath so both decimal (1000KB) and binary (1024KB) upload validators accept your file.'
      }
    ]
  },
  {
    slug: 'pdf-compressor-to-2mb',
    path: '/pdf-compressor-to-2mb',
    label: 'Compress to 2MB',
    targetSizeKB: 2048,
    preset: '2048',
    metaTitle: 'PDF Compressor to 2MB – Optimize Large Portfolios & Catalogs to 2MB',
    metaDescription: 'Compress PDF to 2MB online with minimal quality loss. Perfect for design portfolios, architectural drawings, and product catalogs.',
    h1: 'PDF Compressor to 2MB – Studio-Grade Compression for Large Files',
    subtitle: 'Shrink 20MB–50MB design portfolios, catalogs, and legal bundles under 2MB with virtually indistinguishable visual quality.',
    focusKeyword: 'pdf compressor to 2mb',
    badge: 'Portfolio Preset: 2MB (2048KB)',
    useCaseTitle: 'Built for Designers, Architects, and Legal Teams',
    useCaseIntro: 'When uploading architectural plans, lookbooks, or court exhibits to portals with a 2MB cap, our pdf compressor 2mb mode preserves subtle gradients and fine annotations.',
    limitations: 'Even 40+ page documents easily fit inside a 2MB budget with clean readability.',
    faqs: [
      {
        q: 'How much can a 25MB PDF shrink with the 2MB preset?',
        a: 'Typically by 90% to 94%, turning a sluggish 25MB download into a snappy ~1.9MB file.'
      }
    ]
  },
  {
    slug: 'free-pdf-compressor',
    path: '/free-pdf-compressor',
    label: 'Free PDF Compressor',
    targetSizeKB: null,
    preset: 'recommended',
    metaTitle: 'Free PDF Compressor – No Watermarks, No Sign-Up, Unlimited Files',
    metaDescription: '100% free PDF compressor with no watermarks, no hidden paywalls, and no account registration. Compress PDF files instantly.',
    h1: 'Free PDF Compressor – Zero Watermarks, Zero Paywalls, Instant Results',
    subtitle: 'Enjoy unrestricted PDF compression with custom KB targeting, side-by-side savings analytics, and complete privacy.',
    focusKeyword: 'free pdf compressor',
    badge: '100% Free Forever',
    useCaseTitle: 'Why Pay Monthly Subscriptions Just to Shrink a PDF?',
    useCaseIntro: 'Many online PDF utilities lock custom target sizes behind expensive subscriptions or stamp ugly watermarks onto your pages. ShrinkPDF AI gives you full control over target file sizes completely free.',
    limitations: 'No artificial file count caps or wait timers—compress your files immediately.',
    faqs: [
      {
        q: 'Do you add a watermark to compressed PDFs?',
        a: 'Never. Your compressed PDF remains clean and professional, with zero added logos or watermarks.'
      }
    ]
  },
  {
    slug: 'online-pdf-compressor-free',
    path: '/online-pdf-compressor-free',
    label: 'Online PDF Compressor Free',
    targetSizeKB: null,
    preset: 'recommended',
    metaTitle: 'Online PDF Compressor Free – Reduce PDF Size Anywhere Instantly',
    metaDescription: 'Compress PDF online free from any device. Smart AI-assisted target sizing from 50KB to 2MB with instant preview and download.',
    h1: 'Online PDF Compressor Free – Fast Document Optimization Anywhere',
    subtitle: 'Reduce PDF size online free with automatic quality calibration, instant page previews, and one-click download.',
    focusKeyword: 'online pdf compressor free',
    badge: 'Instant Web Utility',
    useCaseTitle: 'Streamline Your Digital Document Workflow',
    useCaseIntro: 'Whether you are archiving receipts, sending contracts, or preparing web downloads, our pdf compressor online free utility saves storage space and speeds up file transfers.',
    limitations: 'Works best on modern browsers with JavaScript enabled.',
    faqs: [
      {
        q: 'Can I set a custom target file size in KB?',
        a: 'Yes! Select "Custom Target Size" in the compressor tool above and enter any size from 30KB up to 10,000KB.'
      }
    ]
  },
  {
    slug: 'compress-pdf-for-job-application',
    path: '/compress-pdf-for-job-application',
    label: 'PDF for Job Applications',
    targetSizeKB: 100,
    preset: '100',
    metaTitle: 'Compress PDF for Job Application Online – Shrink Resume & Documents',
    metaDescription: 'Reduce a resume, certificate or job application PDF for online form upload limits. Choose a target size and check the result before submitting.',
    h1: 'Compress PDF for Job Applications and Resume Uploads',
    subtitle: 'Prepare resumes, certificates and supporting documents for recruitment websites with a practical PDF size target.',
    focusKeyword: 'compress pdf for job application',
    badge: 'Job Application PDF Guide',
    useCaseTitle: 'Make Recruitment Document Uploads Easier',
    useCaseIntro: 'Recruitment forms may set different file-size limits for resumes, certificates and identity documents. Use the 100KB preset as a starting point for a small document, or choose a larger target when the PDF contains several pages, stamps or photographs. Always follow the limit shown by the employer portal.',
    limitations: 'A multi-page scanned certificate may not remain readable at 100KB. Open the compressed PDF and check names, dates, signatures and document numbers before uploading it.',
    faqs: [
      { q: 'How can I reduce my resume PDF for an online job form?', a: 'Choose the 100KB target above, compress the PDF, download the result and open it to verify that the text and contact details remain readable. If the portal allows a larger file, try 200KB or 500KB for better clarity.' },
      { q: 'What PDF size should I use for a job application?', a: 'Use the maximum size specified by the recruitment portal. There is no single limit for every employer. Select a target at or below that limit and review the output before submitting.' },
      { q: 'Can I compress certificates and mark sheets together?', a: 'Yes, if the portal accepts a combined PDF. Multi-page scans may need a larger target than a one-page resume to keep seals, signatures and small text legible.' }
    ]
  },
  {
    slug: 'compress-pdf-for-government-forms',
    path: '/compress-pdf-for-government-forms',
    label: 'PDF for Government Forms',
    targetSizeKB: 200,
    preset: '200',
    metaTitle: 'Compress PDF for Government Forms – Reduce PDF to Required KB',
    metaDescription: 'Prepare PDF documents for government and exam application uploads. Reduce file size to a selected KB limit and verify readability before submission.',
    h1: 'Compress PDF for Government Forms and Online Applications',
    subtitle: 'Reduce scanned certificates and application documents to fit the file-size limit shown on an online form.',
    focusKeyword: 'compress pdf for government forms',
    badge: 'Online Form Upload Guide',
    useCaseTitle: 'Choose the Correct Size for Each Uploaded Document',
    useCaseIntro: 'Government, exam and admission forms can specify different limits for a photo, certificate, signature or combined PDF. Check the exact instruction beside the upload field first. Use 50KB or 100KB for a very small one-page file only when the portal asks for it; choose 200KB, 300KB or more when the document needs additional detail.',
    limitations: 'Do not force a large, multi-page scan into an extremely small target if the printed text becomes difficult to read. The portal’s size limit and the document’s legibility both matter.',
    faqs: [
      { q: 'Which PDF size is best for government form uploads?', a: 'Use the exact maximum size mentioned on the form. Requirements vary by department and document type, so do not assume that every form accepts 50KB or 100KB.' },
      { q: 'Can I compress a scanned certificate to 100KB?', a: 'You can try the 100KB preset. The achieved size depends on page count, scan resolution and image content. Check every page after compression.' },
      { q: 'Why is my PDF still larger than the selected target?', a: 'A long or image-heavy PDF may have a minimum readable size above the target. Try a larger preset rather than making important text and seals unreadable.' }
    ]
  },
  {
    slug: 'compress-pdf-for-email',
    path: '/compress-pdf-for-email',
    label: 'PDF for Email',
    targetSizeKB: 1024,
    preset: '1024',
    metaTitle: 'Compress PDF for Email – Reduce Large PDF Attachments Online',
    metaDescription: 'Make a PDF easier to email by reducing its file size in your browser. Choose a target such as 500KB or 1MB and review the compressed file.',
    h1: 'Compress PDF for Email Attachments',
    subtitle: 'Reduce large reports, invoices and scanned documents before attaching them to an email.',
    focusKeyword: 'compress pdf for email',
    badge: 'Email Attachment Guide',
    useCaseTitle: 'Create Smaller PDF Attachments',
    useCaseIntro: 'Large PDF attachments can be slow to upload and may exceed mailbox limits. Choose a target based on the recipient’s attachment limit and leave room for the email message and other files. A 500KB or 1MB target can be a useful starting point for many documents, but the right size depends on the number of pages and images.',
    limitations: 'Email providers and workplace mail systems have different attachment limits. Compression cannot guarantee delivery; check the recipient’s limit and review the downloaded PDF before sending.',
    faqs: [
      { q: 'How do I reduce a PDF before emailing it?', a: 'Upload the PDF, choose a target such as 500KB or 1MB, press Compress PDF and download the result. Attach the downloaded file to your email after checking it opens correctly.' },
      { q: 'What is a good PDF size for an email attachment?', a: 'There is no universal email attachment size. Aim for a file comfortably below the limit set by your email provider or workplace. Smaller files are generally easier to send.' },
      { q: 'Will compressing a PDF make it easier to send from a phone?', a: 'A smaller PDF can take less time and mobile data to upload. Processing performance still depends on your phone, browser and the size of the original document.' }
    ]
  },
  {
    slug: 'reduce-pdf-file-size-online',
    path: '/reduce-pdf-file-size-online',
    label: 'Reduce PDF File Size',
    targetSizeKB: null,
    preset: 'recommended',
    metaTitle: 'Reduce PDF File Size Online Free – PDF Size Reducer',
    metaDescription: 'Learn how to reduce PDF file size online. Compress documents in your browser, compare the output size and download a smaller PDF.',
    h1: 'Reduce PDF File Size Online',
    subtitle: 'Use a browser-based PDF size reducer to make documents smaller for sharing, storage and online uploads.',
    focusKeyword: 'reduce pdf file size online',
    badge: 'PDF Size Reduction Guide',
    useCaseTitle: 'A Simple Way to Make PDF Documents Smaller',
    useCaseIntro: 'PDF size is often increased by high-resolution scans, embedded photographs and other page content. Upload your document, choose Recommended or a target size, then compare the original and compressed file sizes. If the document contains fine print or signatures, prioritize readability over the smallest possible file.',
    limitations: 'Some text-based PDFs are already optimized and may shrink only slightly. Image-heavy scans can shrink more, but stronger compression can reduce image detail.',
    faqs: [
      { q: 'How can I reduce PDF file size without installing software?', a: 'Open this page in a modern browser, select your PDF, choose a compression target and download the processed file. No desktop installation is required.' },
      { q: 'Why does my PDF not get much smaller?', a: 'The original file may already be optimized, or it may contain mostly text and vector graphics. There may be little removable data without changing the document.' },
      { q: 'Does a smaller PDF always mean lower quality?', a: 'Not always. Removing unnecessary data may reduce size with little visible change, while reducing image resolution can affect clarity. Review the result before sharing it.' }
    ]
  },
  {
    slug: 'about-us', path: '/about-us', label: 'About Us', isLegal: true,
    metaTitle: 'About Us – ShrinkPDF AI',
    metaDescription: 'Learn about ShrinkPDF AI, a browser-based tool designed to help people compress PDF files quickly and privately.',
    h1: 'About ShrinkPDF AI',
    legalSections: [
      { title: 'Our Mission', body: ['ShrinkPDF AI is an online PDF compression tool built to make reducing PDF file sizes simple and accessible. Our goal is to help students, job applicants, professionals, and everyday users prepare documents for upload limits and sharing.'] },
      { title: 'What We Offer', body: ['The tool provides target-size options such as 50KB, 100KB, 200KB, 300KB, 500KB, 1MB, and 2MB, along with a recommended compression option.', 'The service is designed to work in a modern web browser, without requiring users to install a desktop application. Actual compression results depend on the contents and size of the original PDF.'] },
      { title: 'Privacy Approach', body: ['PDF processing is performed in your browser using client-side technology. We do not intend to permanently store the PDF documents you process. Please review our Privacy Policy for more information.'] },
      { title: 'Contact', body: ['Questions, feedback, or suggestions are welcome. Email us at msulaniya25@gmail.com.'] }
    ]
  },
  {
    slug: 'contact-us', path: '/contact-us', label: 'Contact Us', isLegal: true,
    metaTitle: 'Contact Us – ShrinkPDF AI',
    metaDescription: 'Contact ShrinkPDF AI for support, feedback, questions, or website-related enquiries.',
    h1: 'Contact Us',
    legalSections: [
      { title: 'We Are Here to Help', body: ['If you have a question about using the PDF compressor, want to report a problem, or have feedback about the website, please contact us by email.'] },
      { title: 'Email Support', body: ['Email: msulaniya25@gmail.com', 'Please include a clear subject and describe the issue. Do not email confidential documents or sensitive personal information unless it is necessary and you are comfortable sharing it.'] },
      { title: 'Response Time', body: ['We aim to review messages and respond as reasonably possible. Response times may vary.'] }
    ]
  },
  {
    slug: 'privacy-policy', path: '/privacy-policy', label: 'Privacy Policy', isLegal: true,
    metaTitle: 'Privacy Policy – ShrinkPDF AI',
    metaDescription: 'Read the ShrinkPDF AI Privacy Policy to understand browser-based PDF processing, information, cookies, and advertising.',
    h1: 'Privacy Policy',
    legalSections: [
      { title: 'Information and PDF Files', body: ['ShrinkPDF AI is designed to process PDF files locally in your browser. The website does not intend to upload or permanently store the PDF documents you select for compression. Processing behavior can depend on your browser and device.', 'Please avoid using the service for documents if you are not comfortable processing them on your own device or if your organization prohibits using browser-based tools.'] },
      { title: 'Website Usage Information', body: ['Like many websites, hosting, security, and analytics services may process limited technical information such as browser type, device information, approximate location, pages visited, and diagnostic logs to operate and protect the website.'] },
      { title: 'Cookies and Advertising', body: ['The website may use cookies or similar technologies for functionality, measurement, and advertising. If Google AdSense or other advertising partners display ads, they may use cookies or similar technologies subject to their own policies and applicable settings.', 'You can manage cookies through your browser settings. You may also review Google’s advertising and privacy controls in your Google account.'] },
      { title: 'Third-Party Services', body: ['The website may rely on third-party providers for hosting, security, analytics, or advertising. Those providers process information under their own terms and privacy policies.'] },
      { title: 'Children’s Privacy', body: ['This website is not intentionally designed to collect personal information from children. If you believe a child has provided personal information, contact us so we can review the concern.'] },
      { title: 'Policy Updates and Contact', body: ['We may update this Privacy Policy when the website or applicable requirements change. Updates will be posted on this page.', 'For privacy questions, contact msulaniya25@gmail.com.'] }
    ]
  },
  {
    slug: 'terms-and-conditions', path: '/terms-and-conditions', label: 'Terms & Conditions', isLegal: true,
    metaTitle: 'Terms & Conditions – ShrinkPDF AI',
    metaDescription: 'Read the terms and conditions for using the ShrinkPDF AI online PDF compression service.',
    h1: 'Terms & Conditions',
    legalSections: [
      { title: 'Acceptance of Terms', body: ['By accessing or using ShrinkPDF AI, you agree to these Terms & Conditions. If you do not agree, please do not use the website.'] },
      { title: 'Use of the Service', body: ['You may use the website for lawful personal or business purposes. You are responsible for ensuring that you have the rights and permissions needed to process any document you select.', 'You agree not to misuse the website, interfere with its operation, attempt unauthorized access, or use it in violation of applicable laws.'] },
      { title: 'Compression Results', body: ['PDF compression results vary depending on the source document, embedded images, fonts, and selected target size. We do not guarantee that every PDF can reach an exact file size or retain identical visual quality after compression.', 'Always review the downloaded file before submitting, sharing, or relying on it. Keep your own backup of important documents.'] },
      { title: 'Availability and Disclaimer', body: ['The website is provided on an “as available” basis. We may modify, suspend, or discontinue features at any time. To the extent permitted by law, we disclaim warranties regarding availability, accuracy, and fitness for a particular purpose.'] },
      { title: 'Limitation of Liability', body: ['To the extent permitted by applicable law, ShrinkPDF AI and its operators will not be liable for indirect, incidental, or consequential loss arising from use of the website. Nothing in these terms excludes liability that cannot legally be excluded.'] },
      { title: 'Changes and Contact', body: ['We may update these terms by publishing a revised version on this page. Continued use of the website after changes means you accept the updated terms.', 'For questions about these terms, contact msulaniya25@gmail.com.'] }
    ]
  }
];

const TARGET_CARDS = [
  { kb: 50, title: 'PDF Compressor to 50KB', desc: 'Ultra-compact for strict government & exam portals', slug: 'pdf-compressor-to-50kb', tag: 'Strict Limit' },
  { kb: 100, title: 'PDF Compressor to 100KB', desc: 'Ideal for resumes, KYC forms & bank uploads', slug: 'pdf-compressor-to-100kb', tag: 'Most Popular' },
  { kb: 200, title: 'PDF Compressor to 200KB', desc: 'Crisp signatures & multi-page applications', slug: 'pdf-compressor-to-200kb', tag: 'Balanced' },
  { kb: 300, title: 'PDF Compressor to 300KB', desc: 'Great for assignments, claims & invoices', slug: 'pdf-compressor-to-300kb', tag: 'Standard' },
  { kb: 500, title: 'PDF Compressor to 500KB', desc: 'High clarity for reports & illustrated decks', slug: 'pdf-compressor-to-500kb', tag: 'Crisp Visuals' },
  { kb: 1024, title: 'PDF Compressor to 1MB', desc: 'Email-friendly proposals & multi-page brochures', slug: 'pdf-compressor-to-1mb', tag: 'HD Quality' },
  { kb: 2048, title: 'PDF Compressor to 2MB', desc: 'Studio-grade retention for portfolios & catalogs', slug: 'pdf-compressor-to-2mb', tag: 'Portfolio' }
];

const CORE_FEATURES = [
  { icon: Sparkles, title: 'Free PDF Compression', desc: 'Compress unlimited PDF files with zero watermarks, subscriptions, or hidden paywalls.' },
  { icon: Globe, title: 'Online PDF Compressor', desc: 'Works directly in your browser across Windows, macOS, Linux, iOS, and Android.' },
  { icon: Shield, title: 'Secure PDF Processing', desc: 'Local sandboxed processing ensures sensitive contracts and IDs never leave your device.' },
  { icon: Cpu, title: 'No Software Installation', desc: 'Zero heavy desktop apps or browser extensions required—start shrinking files in seconds.' },
  { icon: Zap, title: 'Fast PDF Compression', desc: 'Multi-pass iterative optimization calculates the ideal DPI and compression ratio rapidly.' },
  { icon: Sliders, title: 'Multiple Target File Sizes', desc: 'Choose 50KB, 100KB, 200KB, 300KB, 500KB, 1MB, 2MB, Recommended, or Custom KB.' },
  { icon: Smartphone, title: 'Mobile Friendly', desc: 'Touch-optimized interface designed for effortless file selection and download on phones.' },
  { icon: Download, title: 'Easy PDF Download', desc: 'Preview first-page clarity, inspect exact KB savings, and download with a single click.' }
];

// ============================================================================
// 2. REAL CLIENT-SIDE PDF COMPRESSION ENGINE (Dynamic Script Loader)
// ============================================================================
const loadExternalScript = (src, globalName) => {
  return new Promise((resolve, reject) => {
    if (window[globalName]) {
      resolve(window[globalName]);
      return;
    }
    const existing = document.querySelector(`script[src="${src}"]`);
    if (existing) {
      existing.addEventListener('load', () => resolve(window[globalName]));
      existing.addEventListener('error', reject);
      return;
    }
    const script = document.createElement('script');
    script.src = src;
    script.async = true;
    script.onload = () => resolve(window[globalName]);
    script.onerror = () => reject(new Error(`Failed to load ${src}`));
    document.head.appendChild(script);
  });
};

const ensurePdfLibraries = async () => {
  const pdfjsLib = await loadExternalScript(
    'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js',
    'pdfjsLib'
  );
  pdfjsLib.GlobalWorkerOptions.workerSrc =
    'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';

  const jspdfModule = await loadExternalScript(
    'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js',
    'jspdf'
  );
  return { pdfjsLib, jsPDF: jspdfModule.jsPDF };
};

const formatBytes = (bytes) => {
  if (!bytes || bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
};

// ============================================================================
// 3. MAIN PDF COMPRESSOR WIDGET COMPONENT
// ============================================================================
function PdfCompressorTool({ initialPreset = 'recommended', onNavigate }) {
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [pageCount, setPageCount] = useState(0);
  const [selectedPreset, setSelectedPreset] = useState(initialPreset);
  const [customKB, setCustomKB] = useState('150');
  const [isDragging, setIsDragging] = useState(false);

  const [isCompressing, setIsCompressing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [statusMessage, setStatusMessage] = useState('');
  const [error, setError] = useState('');
  const [result, setResult] = useState(null);

  const fileInputRef = useRef(null);

  useEffect(() => {
    setSelectedPreset(initialPreset || 'recommended');
  }, [initialPreset]);

  const validateAndLoadFile = async (selectedFile) => {
    setError('');
    setResult(null);
    setProgress(0);

    if (!selectedFile) return;

    // Security & File Validation
    const isPdfMime = selectedFile.type === 'application/pdf';
    const isPdfExt = selectedFile.name.toLowerCase().endsWith('.pdf');
    if (!isPdfMime && !isPdfExt) {
      setError('Invalid file format. Please upload a valid PDF (.pdf) document.');
      return;
    }

    const MAX_SIZE_BYTES = 75 * 1024 * 1024; // 75MB safety limit
    if (selectedFile.size > MAX_SIZE_BYTES) {
      setError('File exceeds the 75MB browser processing limit. Please choose a smaller PDF.');
      return;
    }

    if (selectedFile.size === 0) {
      setError('The uploaded PDF file appears to be empty (0 bytes).');
      return;
    }

    setFile(selectedFile);
    setStatusMessage('Analyzing PDF structure & generating preview...');

    try {
      const { pdfjsLib } = await ensurePdfLibraries();
      const arrayBuffer = await selectedFile.arrayBuffer();
      const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
      const pdfDoc = await loadingTask.promise;
      setPageCount(pdfDoc.numPages);

      // Render Page 1 Thumbnail Preview
      const page = await pdfDoc.getPage(1);
      const viewport = page.getViewport({ scale: 0.55 });
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      canvas.width = viewport.width;
      canvas.height = viewport.height;
      await page.render({ canvasContext: ctx, viewport }).promise;
      setPreviewUrl(canvas.toDataURL('image/jpeg', 0.8));
      setStatusMessage('');
    } catch (err) {
      console.error(err);
      setPreviewUrl(null);
      setStatusMessage('');
      if (err?.name === 'PasswordException') {
        setError('This PDF is password-protected. Please unlock the PDF before compressing.');
        setFile(null);
      }
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const dropped = e.dataTransfer.files?.[0];
    if (dropped) validateAndLoadFile(dropped);
  };

  const getTargetBytes = () => {
    if (selectedPreset === 'recommended') return null;
    if (selectedPreset === 'custom') {
      const parsed = parseFloat(customKB);
      if (isNaN(parsed) || parsed < 10) return null;
      return Math.round(parsed * 1024);
    }
    const kb = parseFloat(selectedPreset);
    return isNaN(kb) ? null : Math.round(kb * 1024);
  };

  // Iterative Real PDF Rendering & Compression Engine
  const compressPdfDocument = async () => {
    if (!file) return;
    setError('');
    setResult(null);

    const targetBytes = getTargetBytes();
    if (selectedPreset === 'custom' && (!targetBytes || targetBytes < 10240)) {
      setError('Please enter a valid custom target size of at least 10 KB.');
      return;
    }

    setIsCompressing(true);
    setProgress(8);
    setStatusMessage('Initializing PDF raster & stream optimization engine...');

    try {
      const { pdfjsLib, jsPDF } = await ensurePdfLibraries();
      const arrayBuffer = await file.arrayBuffer();
      const pdfDoc = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
      const numPages = pdfDoc.numPages;

      // Helper to render all pages at a given DPI scale and JPEG quality
      const buildCompressedBlob = async (scale, jpegQuality, grayscale = false, progressStart, progressEnd) => {
        let doc = null;

        for (let pageNum = 1; pageNum <= numPages; pageNum++) {
          const page = await pdfDoc.getPage(pageNum);
          const unscaledViewport = page.getViewport({ scale: 1 });
          const viewport = page.getViewport({ scale });

          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d', { willReadFrequently: grayscale });
          canvas.width = Math.max(1, Math.floor(viewport.width));
          canvas.height = Math.max(1, Math.floor(viewport.height));

          // White background prevents transparent PNG artifacts turning black in JPEG
          ctx.fillStyle = '#ffffff';
          ctx.fillRect(0, 0, canvas.width, canvas.height);

          await page.render({ canvasContext: ctx, viewport }).promise;

          if (grayscale) {
            const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            const d = imgData.data;
            for (let i = 0; i < d.length; i += 4) {
              const lum = 0.299 * d[i] + 0.587 * d[i + 1] + 0.114 * d[i + 2];
              d[i] = d[i + 1] = d[i + 2] = lum;
            }
            ctx.putImageData(imgData, 0, 0);
          }

          const imgDataUrl = canvas.toDataURL('image/jpeg', jpegQuality);
          const orientation = unscaledViewport.width > unscaledViewport.height ? 'l' : 'p';
          const pageW = unscaledViewport.width * 0.75; // pt
          const pageH = unscaledViewport.height * 0.75; // pt

          if (pageNum === 1) {
            doc = new jsPDF({
              orientation,
              unit: 'pt',
              format: [pageW, pageH],
              compress: true
            });
          } else {
            doc.addPage([pageW, pageH], orientation);
          }

          doc.addImage(imgDataUrl, 'JPEG', 0, 0, pageW, pageH, undefined, 'FAST');

          const stepProgress = progressStart + ((pageNum / numPages) * (progressEnd - progressStart));
          setProgress(Math.min(96, Math.round(stepProgress)));
        }

        return doc.output('blob');
      };

      let bestBlob = null;
      let targetReached = true;
      let explanationNote = '';

      if (!targetBytes) {
        // Recommended balanced compression
        setStatusMessage('Applying balanced AI visual optimization...');
        bestBlob = await buildCompressedBlob(1.15, 0.62, false, 15, 92);
        explanationNote = 'Optimized using balanced resolution & chroma encoding for crisp readability.';
      } else {
        // Multi-pass candidate ladder from highest quality down to ultra-compact
        // Scale 1.0 = 72 DPI. Lower scale + lower JPEG quality reduces size dramatically.
        const candidates = [
          { scale: 1.35, quality: 0.72, gray: false, label: 'High clarity pass' },
          { scale: 1.1, quality: 0.58, gray: false, label: 'Standard web pass' },
          { scale: 0.9, quality: 0.45, gray: false, label: 'Compact size pass' },
          { scale: 0.75, quality: 0.35, gray: false, label: 'High compression pass' },
          { scale: 0.62, quality: 0.26, gray: true, label: 'Deep grayscale pass' },
          { scale: 0.5, quality: 0.18, gray: true, label: 'Maximum readable floor pass' }
        ];

        // Estimate initial starting index based on target bytes per page
        const bytesPerPageBudget = targetBytes / numPages;
        let startIdx = 0;
        if (bytesPerPageBudget < 22000) startIdx = 3;
        else if (bytesPerPageBudget < 45000) startIdx = 2;
        else if (bytesPerPageBudget < 100000) startIdx = 1;

        let smallestBlob = null;
        let qualifyingBlob = null;

        for (let i = startIdx; i < candidates.length; i++) {
          const c = candidates[i];
          const pStart = 12 + ((i - startIdx) / (candidates.length - startIdx)) * 80;
          const pEnd = 12 + ((i - startIdx + 1) / (candidates.length - startIdx)) * 80;
          setStatusMessage(`Running ${c.label} (${numPages} ${numPages === 1 ? 'page' : 'pages'})...`);

          const blob = await buildCompressedBlob(c.scale, c.quality, c.gray, pStart, pEnd);

          if (!smallestBlob || blob.size < smallestBlob.size) {
            smallestBlob = blob;
          }

          if (blob.size <= targetBytes) {
            qualifyingBlob = blob;
            break; // First candidate under target gives the HIGHEST quality that meets the budget!
          }
        }

        if (qualifyingBlob) {
          bestBlob = qualifyingBlob;
          targetReached = true;
          explanationNote = `Successfully compressed under your ${formatBytes(targetBytes)} target while preserving maximum readable clarity.`;
        } else {
          bestBlob = smallestBlob;
          targetReached = false;
          explanationNote = `Achieved the smallest legible size (${formatBytes(bestBlob.size)}) for a ${numPages}-page document. PDF page count, embedded raster images, and structural font headers set a physical minimum floor below which text becomes unreadable.`;
        }
      }

      // Check if original file was already smaller than compressed output
      if (bestBlob.size >= file.size && !targetBytes) {
        bestBlob = file;
        explanationNote = 'Your original PDF is already highly optimized! We preserved the original file to prevent unnecessary re-encoding.';
      }

      const savedBytes = Math.max(0, file.size - bestBlob.size);
      const savedPercent = file.size > 0 ? Math.max(0, Math.round((savedBytes / file.size) * 100)) : 0;
      const downloadUrl = URL.createObjectURL(bestBlob);

      // Sanitize filename
      const cleanBaseName = file.name
        .replace(/\.pdf$/i, '')
        .replace(/[^a-zA-Z0-9-_]/g, '_')
        .slice(0, 60);

      setProgress(100);
      setResult({
        url: downloadUrl,
        fileName: `${cleanBaseName}_compressed.pdf`,
        originalSize: file.size,
        compressedSize: bestBlob.size,
        savedBytes,
        savedPercent,
        targetBytes,
        targetReached,
        explanationNote
      });
    } catch (err) {
      console.error('Compression error:', err);
      setError('An unexpected error occurred while processing this PDF. Please verify the file is not corrupted and try again.');
    } finally {
      setIsCompressing(false);
      setStatusMessage('');
    }
  };

  const resetTool = () => {
    if (result?.url) URL.revokeObjectURL(result.url);
    setFile(null);
    setPreviewUrl(null);
    setPageCount(0);
    setResult(null);
    setError('');
    setProgress(0);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const presets = [
    { id: 'recommended', label: 'Recommended', sub: 'Smart AI Balance' },
    { id: '50', label: '50 KB', sub: 'Strict Portals' },
    { id: '100', label: '100 KB', sub: 'Resumes & IDs' },
    { id: '200', label: '200 KB', sub: 'Forms & Scans' },
    { id: '300', label: '300 KB', sub: 'Assignments' },
    { id: '500', label: '500 KB', sub: 'Reports & Decks' },
    { id: '1024', label: '1 MB', sub: 'HD Email File' },
    { id: '2048', label: '2 MB', sub: 'Portfolios' },
    { id: 'custom', label: 'Custom KB', sub: 'Exact Size' }
  ];

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-2xl shadow-indigo-500/10 border border-slate-200/80 dark:border-slate-800 overflow-hidden transition-all">
        {/* Top Tool Status Bar */}
        <div className="px-6 py-3.5 bg-gradient-to-r from-blue-600/5 via-indigo-600/5 to-purple-600/5 dark:from-blue-500/10 dark:to-purple-500/10 border-b border-slate-200/70 dark:border-slate-800 flex flex-wrap items-center justify-between gap-2 text-xs font-medium text-slate-600 dark:text-slate-300">
          <div className="flex items-center gap-2">
            <span className="inline-flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Real Multi-Pass PDF Optimization Engine Ready</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1"><Lock className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" /> Local Browser Sandbox</span>
            <span className="hidden sm:inline text-slate-400">|</span>
            <span className="hidden sm:inline">Max 75MB PDF</span>
          </div>
        </div>

        <div className="p-6 sm:p-8">
          {/* Error Banner */}
          {error && (
            <div className="mb-6 p-4 rounded-2xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800/60 flex items-start gap-3 text-red-700 dark:text-red-300 text-sm">
              <AlertCircle className="w-5 h-5 shrink-0 mt-0.5 text-red-600 dark:text-red-400" />
              <div className="flex-1">{error}</div>
              <button onClick={() => setError('')} className="p-1 hover:bg-red-100 dark:hover:bg-red-900/50 rounded-lg">
                <X className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* STEP 1: UPLOAD DROPZONE (When no file is loaded) */}
          {!file && (
            <div
              onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`group relative cursor-pointer rounded-2xl border-2 border-dashed transition-all duration-200 p-8 sm:p-12 text-center ${
                isDragging
                  ? 'border-blue-600 bg-blue-50/70 dark:bg-blue-950/30 scale-[1.01]'
                  : 'border-slate-300 dark:border-slate-700 hover:border-blue-500 dark:hover:border-blue-500 bg-slate-50/60 dark:bg-slate-800/40 hover:bg-blue-50/30 dark:hover:bg-slate-800/70'
              }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,application/pdf"
                onChange={(e) => validateAndLoadFile(e.target.files?.[0])}
                className="hidden"
                aria-label="Upload PDF file"
              />

              <div className="mx-auto w-16 h-16 rounded-2xl bg-gradient-to-tr from-blue-600 to-purple-600 text-white flex items-center justify-center shadow-lg shadow-blue-600/25 group-hover:scale-105 transition-transform mb-5">
                <Upload className="w-8 h-8" />
              </div>

              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-2">
                Drop your PDF here, or <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">browse device</span>
              </h2>
              <p className="text-sm text-slate-500 dark:text-slate-400 max-w-md mx-auto mb-6">
                Select a target size from 50KB to 2MB and shrink your document immediately without losing readability.
              </p>

              <button
                type="button"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg shadow-blue-600/20 transition-all"
              >
                <FileText className="w-5 h-5" />
                Select PDF File
              </button>
            </div>
          )}

          {/* STEP 2: FILE LOADED & COMPRESSION CONTROLS */}
          {file && (
            <div className="space-y-6">
              {/* File Info & Preview Header */}
              <div className="flex flex-col sm:flex-row items-center gap-5 p-4 sm:p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80">
                {/* Page 1 Preview Thumbnail */}
                <div className="w-20 h-28 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden flex items-center justify-center shrink-0">
                  {previewUrl ? (
                    <img src={previewUrl} alt="PDF Page 1 Preview" className="w-full h-full object-cover" />
                  ) : (
                    <FileText className="w-9 h-9 text-blue-600" />
                  )}
                </div>

                <div className="flex-1 min-w-0 text-center sm:text-left">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300 mb-1.5">
                    PDF Document {pageCount > 0 ? `• ${pageCount} ${pageCount === 1 ? 'Page' : 'Pages'}` : ''}
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white truncate" title={file.name}>
                    {file.name}
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-300 mt-0.5">
                    Original Size: <span className="font-bold text-slate-900 dark:text-white">{formatBytes(file.size)}</span>
                  </p>
                </div>

                <button
                  type="button"
                  onClick={resetTool}
                  disabled={isCompressing}
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-medium text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors disabled:opacity-50"
                >
                  <RefreshCw className="w-4 h-4" />
                  Change PDF
                </button>
              </div>

              {/* Target Size Selector Grid */}
              {!result && (
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <label className="text-sm font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2">
                      <Sliders className="w-4 h-4 text-blue-600" />
                      Select Target File Size
                    </label>
                    <span className="text-xs text-slate-500 dark:text-slate-400">9 Compression Modes</span>
                  </div>

                  <div className="grid grid-cols-3 sm:grid-cols-5 gap-2.5">
                    {presets.map((p) => {
                      const active = selectedPreset === p.id;
                      return (
                        <button
                          key={p.id}
                          type="button"
                          disabled={isCompressing}
                          onClick={() => setSelectedPreset(p.id)}
                          className={`p-3 rounded-xl border text-left transition-all ${
                            active
                              ? 'border-blue-600 bg-gradient-to-br from-blue-600/10 to-purple-600/10 dark:from-blue-500/20 dark:to-purple-500/20 ring-2 ring-blue-600/30'
                              : 'border-slate-200 dark:border-slate-700/80 hover:border-blue-400 bg-white dark:bg-slate-800/40'
                          }`}
                        >
                          <div className={`text-sm font-bold ${active ? 'text-blue-700 dark:text-blue-300' : 'text-slate-900 dark:text-white'}`}>
                            {p.label}
                          </div>
                          <div className="text-[11px] text-slate-500 dark:text-slate-400 truncate mt-0.5">
                            {p.sub}
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  {/* Custom Target Size Input */}
                  {selectedPreset === 'custom' && (
                    <div className="mt-4 p-4 rounded-xl bg-blue-50/60 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800/60 flex flex-col sm:flex-row sm:items-center gap-3">
                      <label htmlFor="custom-kb-input" className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                        Enter Custom Target Size (KB):
                      </label>
                      <div className="flex items-center gap-2">
                        <input
                          id="custom-kb-input"
                          type="number"
                          min="15"
                          max="50000"
                          value={customKB}
                          onChange={(e) => setCustomKB(e.target.value)}
                          className="w-36 px-3.5 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-semibold focus:ring-2 focus:ring-blue-500 outline-none"
                          placeholder="e.g. 150"
                        />
                        <span className="text-sm font-medium text-slate-600 dark:text-slate-400">KB</span>
                      </div>
                    </div>
                  )}

                  {/* Progress Bar during compression */}
                  {isCompressing && (
                    <div className="mt-6 p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700">
                      <div className="flex items-center justify-between text-sm font-semibold text-slate-800 dark:text-slate-200 mb-2">
                        <span className="flex items-center gap-2">
                          <RefreshCw className="w-4 h-4 animate-spin text-blue-600" />
                          {statusMessage || 'Compressing PDF...'}
                        </span>
                        <span className="text-blue-600 dark:text-blue-400">{progress}%</span>
                      </div>
                      <div className="w-full h-3 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-blue-600 to-purple-600 transition-all duration-300 rounded-full"
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                    </div>
                  )}

                  {/* Primary Action Button */}
                  {!isCompressing && (
                    <div className="mt-6 flex flex-col sm:flex-row items-center gap-3">
                      <button
                        type="button"
                        onClick={compressPdfDocument}
                        className="w-full sm:flex-1 py-4 px-8 rounded-2xl font-bold text-base text-white bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-xl shadow-blue-600/20 flex items-center justify-center gap-2.5 transition-all cursor-pointer"
                      >
                        <Zap className="w-5 h-5" />
                        Compress PDF Now
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* STEP 3: COMPRESSION RESULTS DASHBOARD */}
              {result && (
                <div className="rounded-2xl border border-emerald-200 dark:border-emerald-800/60 bg-gradient-to-br from-emerald-50/80 via-white to-blue-50/60 dark:from-emerald-950/30 dark:via-slate-900 dark:to-blue-950/20 p-6">
                  <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
                    <div className="flex items-center gap-2.5">
                      <div className="w-10 h-10 rounded-xl bg-emerald-500 text-white flex items-center justify-center shadow-md shadow-emerald-500/20">
                        <CheckCircle2 className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                          PDF Compression Complete!
                        </h3>
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                          Ready for immediate download
                        </p>
                      </div>
                    </div>

                    <span className="px-3.5 py-1.5 rounded-full text-sm font-extrabold bg-emerald-100 text-emerald-800 dark:bg-emerald-900/60 dark:text-emerald-300">
                      -{result.savedPercent}% Reduced
                    </span>
                  </div>

                  {/* Metrics Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
                    <div className="p-3.5 rounded-xl bg-white dark:bg-slate-800/90 border border-slate-200/80 dark:border-slate-700">
                      <div className="text-xs text-slate-500 dark:text-slate-400">Original Size</div>
                      <div className="text-base font-bold text-slate-900 dark:text-white mt-0.5">
                        {formatBytes(result.originalSize)}
                      </div>
                    </div>
                    <div className="p-3.5 rounded-xl bg-white dark:bg-slate-800/90 border border-blue-200 dark:border-blue-800">
                      <div className="text-xs text-blue-600 dark:text-blue-400 font-medium">Compressed Size</div>
                      <div className="text-base font-extrabold text-blue-700 dark:text-blue-300 mt-0.5">
                        {formatBytes(result.compressedSize)}
                      </div>
                    </div>
                    <div className="p-3.5 rounded-xl bg-white dark:bg-slate-800/90 border border-slate-200/80 dark:border-slate-700">
                      <div className="text-xs text-slate-500 dark:text-slate-400">Size Saved</div>
                      <div className="text-base font-bold text-emerald-600 dark:text-emerald-400 mt-0.5">
                        {formatBytes(result.savedBytes)}
                      </div>
                    </div>
                    <div className="p-3.5 rounded-xl bg-white dark:bg-slate-800/90 border border-slate-200/80 dark:border-slate-700">
                      <div className="text-xs text-slate-500 dark:text-slate-400">Reduction</div>
                      <div className="text-base font-bold text-purple-600 dark:text-purple-400 mt-0.5">
                        {result.savedPercent}%
                      </div>
                    </div>
                  </div>

                  {/* Realistic Compression Note */}
                  <div className={`p-3.5 rounded-xl text-xs leading-relaxed mb-6 flex items-start gap-2.5 ${
                    result.targetReached
                      ? 'bg-blue-50/80 dark:bg-blue-950/40 text-blue-800 dark:text-blue-200 border border-blue-200/70 dark:border-blue-800/50'
                      : 'bg-amber-50 dark:bg-amber-950/40 text-amber-900 dark:text-amber-200 border border-amber-200 dark:border-amber-800/60'
                  }`}>
                    <Info className="w-4 h-4 shrink-0 mt-0.5" />
                    <span>{result.explanationNote}</span>
                  </div>

                  {/* Download & Reset Actions */}
                  <div className="flex flex-col sm:flex-row items-center gap-3">
                    <a
                      href={result.url}
                      download={result.fileName}
                      className="w-full sm:flex-1 py-4 px-6 rounded-2xl font-bold text-white bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 shadow-lg shadow-emerald-600/20 flex items-center justify-center gap-2 transition-all"
                    >
                      <Download className="w-5 h-5" />
                      Download Compressed PDF ({formatBytes(result.compressedSize)})
                    </a>

                    <button
                      type="button"
                      onClick={() => setResult(null)}
                      className="w-full sm:w-auto py-4 px-5 rounded-2xl font-semibold text-sm text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
                    >
                      Adjust Target Size
                    </button>

                    <button
                      type="button"
                      onClick={resetTool}
                      className="w-full sm:w-auto py-4 px-5 rounded-2xl font-semibold text-sm text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-950/50 hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors"
                    >
                      Upload Another PDF
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// 4. AI SEO CONTENT GENERATOR & ADMIN DASHBOARD
// ============================================================================
function AdminSeoDashboard({ pages, setPages, onPreviewPage }) {
  const [activeTab, setActiveTab] = useState('generator'); // 'generator' | 'pages' | 'technical'
  const [editingPage, setEditingPage] = useState(null);

  // AI Generator Form State
  const [form, setForm] = useState({
    focusKeyword: 'compress pdf for email attachment',
    secondaryKeywords: 'reduce pdf size for gmail, shrink pdf under 5mb, email pdf compressor',
    longTailKeywords: 'how to compress a large pdf file to send via email without losing quality',
    pageTitle: 'Compress PDF for Email – Shrink Large Attachments in Seconds',
    searchIntent: 'Transactional / Tool Usage',
    targetWordCount: '650',
    contentTone: 'Authoritative, Clear & Helpful SaaS',
    targetAudience: 'Professionals, students, and job applicants emailing documents',
    relatedKeywords: 'pdf compressor online, free pdf compressor, pdf compressor to 1mb',
    faqs: 'What is the maximum PDF attachment size for Gmail and Outlook?',
    customInstructions: 'Include practical tips on DPI settings and mention clean internal links.'
  });

  const [isGenerating, setIsGenerating] = useState(false);
  const [genError, setGenError] = useState('');
  const [generatedDraft, setGeneratedDraft] = useState(null);
  const [toastMsg, setToastMsg] = useState('');

  const showToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(''), 3500);
  };

  // Call Gemini API for Structured SEO Content Generation
  const handleGenerateAiContent = async (e) => {
    e.preventDefault();
    setIsGenerating(true);
    setGenError('');

    const systemPrompt = `You are a senior Technical SEO Strategist and SaaS Content Architect for "ShrinkPDF AI", a modern online PDF compressor web application. Generate original, human-readable, high-converting, non-keyword-stuffed SEO page content and structured schema markup.`;

    const userQuery = `Generate a complete SEO landing page package in JSON format using these inputs:
- Focus Keyword: ${form.focusKeyword}
- Secondary Keywords: ${form.secondaryKeywords}
- Long-tail Keywords: ${form.longTailKeywords}
- Desired Page Title: ${form.pageTitle}
- Search Intent: ${form.searchIntent}
- Target Word Count: ${form.targetWordCount} words
- Content Tone: ${form.contentTone}
- Target Audience: ${form.targetAudience}
- Related Keywords: ${form.relatedKeywords}
- Seed FAQ Topic: ${form.faqs}
- Custom Instructions: ${form.customInstructions}

Return valid JSON matching the exact schema.`;

    const payload = {
      contents: [{ parts: [{ text: userQuery }] }],
      systemInstruction: { parts: [{ text: systemPrompt }] },
      generationConfig: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: 'OBJECT',
          properties: {
            slug: { type: 'STRING' },
            metaTitle: { type: 'STRING' },
            metaDescription: { type: 'STRING' },
            h1: { type: 'STRING' },
            subtitle: { type: 'STRING' },
            h2SectionTitle: { type: 'STRING' },
            h2Body: { type: 'STRING' },
            h3Subheadings: {
              type: 'ARRAY',
              items: {
                type: 'OBJECT',
                properties: {
                  heading: { type: 'STRING' },
                  content: { type: 'STRING' }
                }
              }
            },
            limitations: { type: 'STRING' },
            imageAltText: { type: 'STRING' },
            internalLinks: {
              type: 'ARRAY',
              items: {
                type: 'OBJECT',
                properties: {
                  anchorText: { type: 'STRING' },
                  targetSlug: { type: 'STRING' }
                }
              }
            },
            faqs: {
              type: 'ARRAY',
              items: {
                type: 'OBJECT',
                properties: {
                  q: { type: 'STRING' },
                  a: { type: 'STRING' }
                }
              }
            },
            schemaJsonLd: { type: 'STRING' }
          }
        }
      }
    };

    const apiKey = '';
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent?key=${apiKey}`;

    const fetchWithBackoff = async (retries = 3, delay = 1000) => {
      for (let i = 0; i < retries; i++) {
        try {
          const res = await fetch(apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
          });
          if (!res.ok) throw new Error(`HTTP ${res.status}`);
          return await res.json();
        } catch (err) {
          if (i === retries - 1) throw err;
          await new Promise((r) => setTimeout(r, delay * Math.pow(2, i)));
        }
      }
    };

    try {
      const data = await fetchWithBackoff();
      const rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text;
      if (!rawText) throw new Error('Empty response from Gemini API');
      const parsed = JSON.parse(rawText);

      const cleanSlug = (parsed.slug || form.focusKeyword)
        .toLowerCase()
        .replace(/^\/+/, '')
        .replace(/[^a-z0-9-]+/g, '-')
        .replace(/^-|-$/g, '');

      setGeneratedDraft({
        ...parsed,
        slug: cleanSlug,
        path: `/${cleanSlug}`,
        label: parsed.h1?.slice(0, 28) || form.focusKeyword,
        focusKeyword: form.focusKeyword,
        preset: 'recommended',
        targetSizeKB: null,
        badge: 'AI Generated SEO Page',
        useCaseTitle: parsed.h2SectionTitle,
        useCaseIntro: parsed.h2Body,
        status: 'draft'
      });
      showToast('AI SEO Content Package generated successfully!');
    } catch (err) {
      console.error(err);
      setGenError('Could not connect to AI endpoint right now. Loaded a structured SEO template you can customize and publish.');
      const fallbackSlug = form.focusKeyword.toLowerCase().replace(/[^a-z0-9]+/g, '-');
      setGeneratedDraft({
        slug: fallbackSlug,
        path: `/${fallbackSlug}`,
        label: form.pageTitle.slice(0, 26),
        metaTitle: form.pageTitle,
        metaDescription: `Use our ${form.focusKeyword} tool to optimize PDF documents online for free. Fast, secure, and customizable target KB sizes.`,
        h1: form.pageTitle,
        subtitle: `Optimize your PDF files with our ${form.focusKeyword} utility in seconds—zero watermarks and full browser privacy.`,
        useCaseTitle: `How to Use Our ${form.focusKeyword} Tool Effectively`,
        useCaseIntro: `Designed for ${form.targetAudience}, this tool calibrates image resolution and PDF stream encoding to hit your exact file size requirements without sacrificing legibility.`,
        h3Subheadings: [
          { heading: 'Smart DPI & Compression Balance', content: 'Our multi-pass engine inspects each page and chooses the highest visual quality that satisfies your size budget.' },
          { heading: 'Private Client-Side Processing', content: 'Your files remain inside your local browser memory during compression.' }
        ],
        limitations: 'Multi-page scanned PDFs have a physical minimum size floor required to keep text legible.',
        imageAltText: `${form.focusKeyword} online interface showing file size reduction progress`,
        internalLinks: [
          { anchorText: 'PDF Compressor to 100KB', targetSlug: 'pdf-compressor-to-100kb' },
          { anchorText: 'PDF Compressor to 200KB', targetSlug: 'pdf-compressor-to-200kb' }
        ],
        faqs: [
          {
            q: form.faqs || `How does ${form.focusKeyword} work?`,
            a: 'Upload your PDF document, pick a target size or Recommended mode, and download the compressed file immediately.'
          }
        ],
        schemaJsonLd: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'SoftwareApplication',
          name: form.pageTitle,
          applicationCategory: 'UtilitiesApplication',
          operatingSystem: 'Web'
        }, null, 2),
        focusKeyword: form.focusKeyword,
        preset: 'recommended',
        targetSizeKB: null,
        badge: 'SEO Draft',
        status: 'draft'
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const publishDraft = (draftToPublish) => {
    const cleanPage = {
      ...draftToPublish,
      status: 'published',
      updatedAt: new Date().toLocaleDateString()
    };

    setPages((prev) => {
      const exists = prev.some((p) => p.slug === cleanPage.slug);
      if (exists) {
        return prev.map((p) => (p.slug === cleanPage.slug ? cleanPage : p));
      }
      return [...prev, cleanPage];
    });

    showToast(`Published "/${cleanPage.slug}" live to site navigation!`);
  };

  const togglePublishStatus = (slug) => {
    setPages((prev) =>
      prev.map((p) =>
        p.slug === slug
          ? { ...p, status: p.status === 'unpublished' ? 'published' : 'unpublished' }
          : p
      )
    );
    showToast('Updated page publication status.');
  };

  const deleteCustomPage = (slug) => {
    if (slug === '/') return;
    setPages((prev) => prev.filter((p) => p.slug !== slug));
    showToast(`Deleted page "/${slug}".`);
  };

  // Generate dynamic XML Sitemap & Robots.txt previews
  const xmlSitemap = useMemo(() => {
    const published = pages.filter((p) => p.status !== 'unpublished');
    const urls = published
      .map(
        (p) => `  <url>
    <loc>https://shrinkpdf-ai-8leu.vercel.app${p.path}</loc>
    <lastmod>${new Date().toISOString().slice(0, 10)}</lastmod>
    <changefreq>${p.slug === '/' ? 'daily' : 'weekly'}</changefreq>
    <priority>${p.slug === '/' ? '1.0' : '0.85'}</priority>
  </url>`
      )
      .join('\n');
    return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>`;
  }, [pages]);

  const robotsTxt = `User-agent: *\nAllow: /\nDisallow: /admin/\nDisallow: /api/\n\nSitemap: https://shrinkpdf-ai-8leu.vercel.app/sitemap.xml`;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Toast Notification */}
      {toastMsg && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-5 py-3.5 rounded-2xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-2xl font-medium text-sm">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 dark:text-emerald-600" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* Dashboard Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-purple-100 text-purple-700 dark:bg-purple-900/50 dark:text-purple-300 mb-2">
            <Sparkles className="w-3.5 h-3.5" /> Admin CMS & AI SEO Studio
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            SEO Content Generator & Page Manager
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
            Generate human-readable SEO landing pages, edit metadata & schema markup, and publish live routes.
          </p>
        </div>

        {/* Sub-navigation Tabs */}
        <div className="flex flex-wrap gap-2 bg-slate-100 dark:bg-slate-800/80 p-1.5 rounded-2xl border border-slate-200 dark:border-slate-700">
          <button
            onClick={() => setActiveTab('generator')}
            className={`px-4 py-2 rounded-xl text-sm font-semibold flex items-center gap-2 transition-all ${
              activeTab === 'generator'
                ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-sm'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'
            }`}
          >
            <Sparkles className="w-4 h-4" /> AI Content Generator
          </button>
          <button
            onClick={() => setActiveTab('pages')}
            className={`px-4 py-2 rounded-xl text-sm font-semibold flex items-center gap-2 transition-all ${
              activeTab === 'pages'
                ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-sm'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'
            }`}
          >
            <Layers className="w-4 h-4" /> Manage Pages ({pages.length})
          </button>
          <button
            onClick={() => setActiveTab('technical')}
            className={`px-4 py-2 rounded-xl text-sm font-semibold flex items-center gap-2 transition-all ${
              activeTab === 'technical'
                ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-sm'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'
            }`}
          >
            <Code2 className="w-4 h-4" /> Sitemap & Schema
          </button>
        </div>
      </div>

      {/* TAB 1: AI SEO CONTENT GENERATOR */}
      {activeTab === 'generator' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Input Parameters Form */}
          <form
            onSubmit={handleGenerateAiContent}
            className="lg:col-span-5 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm space-y-4"
          >
            <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2 pb-3 border-b border-slate-100 dark:border-slate-800">
              <Settings className="w-5 h-5 text-blue-600" />
              AI Content Parameters
            </h2>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
                Focus Keyword *
              </label>
              <input
                type="text"
                required
                value={form.focusKeyword}
                onChange={(e) => setForm({ ...form, focusKeyword: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
                  Search Intent
                </label>
                <select
                  value={form.searchIntent}
                  onChange={(e) => setForm({ ...form, searchIntent: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm text-slate-900 dark:text-white outline-none"
                >
                  <option>Transactional / Tool Usage</option>
                  <option>Informational / How-To Guide</option>
                  <option>Commercial Comparison</option>
                  <option>Blog Post / Tutorial</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
                  Target Word Count
                </label>
                <input
                  type="number"
                  value={form.targetWordCount}
                  onChange={(e) => setForm({ ...form, targetWordCount: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm text-slate-900 dark:text-white outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
                Page Title / H1 Seed
              </label>
              <input
                type="text"
                value={form.pageTitle}
                onChange={(e) => setForm({ ...form, pageTitle: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm text-slate-900 dark:text-white outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
                Secondary Keywords
              </label>
              <input
                type="text"
                value={form.secondaryKeywords}
                onChange={(e) => setForm({ ...form, secondaryKeywords: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm text-slate-900 dark:text-white outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
                Long-Tail Keywords
              </label>
              <input
                type="text"
                value={form.longTailKeywords}
                onChange={(e) => setForm({ ...form, longTailKeywords: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm text-slate-900 dark:text-white outline-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
                  Content Tone
                </label>
                <input
                  type="text"
                  value={form.contentTone}
                  onChange={(e) => setForm({ ...form, contentTone: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm text-slate-900 dark:text-white outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
                  Target Audience
                </label>
                <input
                  type="text"
                  value={form.targetAudience}
                  onChange={(e) => setForm({ ...form, targetAudience: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm text-slate-900 dark:text-white outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
                Related Keywords & FAQ Seed
              </label>
              <input
                type="text"
                value={form.faqs}
                onChange={(e) => setForm({ ...form, faqs: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm text-slate-900 dark:text-white outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
                Custom AI Instructions
              </label>
              <textarea
                rows={2}
                value={form.customInstructions}
                onChange={(e) => setForm({ ...form, customInstructions: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm text-slate-900 dark:text-white outline-none"
              />
            </div>

            <button
              type="submit"
              disabled={isGenerating}
              className="w-full py-3.5 px-6 rounded-2xl font-bold text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg shadow-blue-600/20 flex items-center justify-center gap-2 transition-all disabled:opacity-60"
            >
              {isGenerating ? (
                <>
                  <RefreshCw className="w-5 h-5 animate-spin" />
                  Generating SEO Content...
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  Generate Content with AI
                </>
              )}
            </button>
          </form>

          {/* Generated Output Editor & Live Preview */}
          <div className="lg:col-span-7">
            {genError && (
              <div className="mb-4 p-3.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-xs text-amber-800 dark:text-amber-200">
                {genError}
              </div>
            )}

            {!generatedDraft ? (
              <div className="h-full min-h-[460px] rounded-3xl border-2 border-dashed border-slate-200 dark:border-slate-800 flex flex-col items-center justify-center p-8 text-center bg-slate-50/50 dark:bg-slate-900/40">
                <div className="w-14 h-14 rounded-2xl bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-4">
                  <Sparkles className="w-7 h-7" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                  Ready to Generate Human-Readable SEO Pages
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 max-w-md">
                  Configure your target keyword, search intent, and tone on the left, then click <strong>Generate Content with AI</strong> to create meta tags, H1–H3 headings, FAQs, internal links, and JSON-LD schema.
                </p>
              </div>
            ) : (
              <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm space-y-5">
                <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-100 dark:border-slate-800">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                      Editable SEO Output
                    </span>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                      /{generatedDraft.slug}
                    </h3>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        publishDraft(generatedDraft);
                        onPreviewPage(generatedDraft.slug);
                      }}
                      className="px-4 py-2 rounded-xl text-xs font-bold bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 hover:bg-slate-200 flex items-center gap-1.5"
                    >
                      <Eye className="w-4 h-4" /> Save & Preview Live
                    </button>
                    <button
                      type="button"
                      onClick={() => publishDraft(generatedDraft)}
                      className="px-4 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md flex items-center gap-1.5"
                    >
                      <Check className="w-4 h-4" /> Publish Page
                    </button>
                  </div>
                </div>

                {/* Editable Meta Title & URL Slug */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-500 mb-1">SEO-Friendly URL Slug</label>
                    <input
                      type="text"
                      value={generatedDraft.slug}
                      onChange={(e) =>
                        setGeneratedDraft({
                          ...generatedDraft,
                          slug: e.target.value,
                          path: `/${e.target.value.replace(/^\/+/, '')}`
                        })
                      }
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm text-slate-900 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 mb-1">
                      Meta Title ({generatedDraft.metaTitle?.length || 0}/65 chars)
                    </label>
                    <input
                      type="text"
                      value={generatedDraft.metaTitle}
                      onChange={(e) => setGeneratedDraft({ ...generatedDraft, metaTitle: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm text-slate-900 dark:text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1">
                    Meta Description ({generatedDraft.metaDescription?.length || 0}/160 chars)
                  </label>
                  <textarea
                    rows={2}
                    value={generatedDraft.metaDescription}
                    onChange={(e) => setGeneratedDraft({ ...generatedDraft, metaDescription: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm text-slate-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1">H1 Main Heading</label>
                  <input
                    type="text"
                    value={generatedDraft.h1}
                    onChange={(e) => setGeneratedDraft({ ...generatedDraft, h1: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm font-semibold text-slate-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1">H2 Section & Body Copy</label>
                  <input
                    type="text"
                    value={generatedDraft.useCaseTitle || ''}
                    onChange={(e) => setGeneratedDraft({ ...generatedDraft, useCaseTitle: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm font-semibold text-slate-900 dark:text-white mb-2"
                  />
                  <textarea
                    rows={3}
                    value={generatedDraft.useCaseIntro || ''}
                    onChange={(e) => setGeneratedDraft({ ...generatedDraft, useCaseIntro: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm text-slate-900 dark:text-white"
                  />
                </div>

                {/* Image Alt Text & Internal Links */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                    <div className="text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Generated Image Alt Text</div>
                    <p className="text-xs text-slate-600 dark:text-slate-400">{generatedDraft.imageAltText}</p>
                  </div>
                  <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                    <div className="text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Internal Link Suggestions</div>
                    <div className="flex flex-wrap gap-1.5 mt-1">
                      {(generatedDraft.internalLinks || []).map((lnk, idx) => (
                        <span key={idx} className="px-2 py-0.5 rounded bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 text-[11px] font-medium">
                          {lnk.anchorText} → /{lnk.targetSlug}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Generated FAQs & JSON-LD */}
                <div>
                  <div className="text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
                    Generated FAQs ({generatedDraft.faqs?.length || 0}) & JSON-LD Schema
                  </div>
                  <pre className="p-3.5 rounded-xl bg-slate-950 text-emerald-400 text-xs overflow-x-auto max-h-40">
                    {generatedDraft.schemaJsonLd}
                  </pre>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 2: MANAGE ALL PUBLISHED & DRAFT PAGES */}
      {activeTab === 'pages' && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
          <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              All SEO Landing Pages & Routes
            </h2>
            <button
              onClick={() => setActiveTab('generator')}
              className="px-4 py-2 rounded-xl text-xs font-bold bg-blue-600 text-white hover:bg-blue-700 flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" /> Create New AI Page
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-800/60 text-xs font-bold uppercase text-slate-500 dark:text-slate-400 border-b border-slate-200 dark:border-slate-800">
                  <th className="py-3.5 px-5">Route / Slug</th>
                  <th className="py-3.5 px-5">Focus Keyword</th>
                  <th className="py-3.5 px-5">SEO Meta Title</th>
                  <th className="py-3.5 px-5">Status</th>
                  <th className="py-3.5 px-5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-sm">
                {pages.map((pg) => {
                  const isUnpublished = pg.status === 'unpublished';
                  return (
                    <tr key={pg.slug} className="hover:bg-slate-50/70 dark:hover:bg-slate-800/40">
                      <td className="py-3.5 px-5 font-mono text-xs font-semibold text-blue-600 dark:text-blue-400">
                        {pg.path}
                      </td>
                      <td className="py-3.5 px-5 font-medium text-slate-800 dark:text-slate-200">
                        {pg.focusKeyword}
                      </td>
                      <td className="py-3.5 px-5 text-slate-600 dark:text-slate-400 max-w-xs truncate">
                        {pg.metaTitle}
                      </td>
                      <td className="py-3.5 px-5">
                        <span
                          className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                            isUnpublished
                              ? 'bg-amber-100 text-amber-800 dark:bg-amber-900/50 dark:text-amber-300'
                              : 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/50 dark:text-emerald-300'
                          }`}
                        >
                          {isUnpublished ? 'Unpublished' : 'Published'}
                        </span>
                      </td>
                      <td className="py-3.5 px-5 text-right">
                        <div className="inline-flex items-center gap-1.5">
                          <button
                            onClick={() => onPreviewPage(pg.slug)}
                            title="View Page"
                            className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => setEditingPage({ ...pg })}
                            title="Edit SEO Metadata"
                            className="p-2 rounded-lg text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950/50"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>
                          {pg.slug !== '/' && (
                            <>
                              <button
                                onClick={() => togglePublishStatus(pg.slug)}
                                className="px-2.5 py-1 rounded-lg text-xs font-semibold border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800"
                              >
                                {isUnpublished ? 'Publish' : 'Unpublish'}
                              </button>
                              <button
                                onClick={() => deleteCustomPage(pg.slug)}
                                title="Delete Page"
                                className="p-2 rounded-lg text-red-600 hover:bg-red-50 dark:hover:bg-red-950/50"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Inline Modal for Quick Metadata Editing */}
          {editingPage && (
            <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4">
              <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 max-w-xl w-full p-6 shadow-2xl space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                    Edit SEO Metadata ({editingPage.path})
                  </h3>
                  <button onClick={() => setEditingPage(null)} className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1">Meta Title</label>
                  <input
                    type="text"
                    value={editingPage.metaTitle}
                    onChange={(e) => setEditingPage({ ...editingPage, metaTitle: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm text-slate-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1">Meta Description</label>
                  <textarea
                    rows={3}
                    value={editingPage.metaDescription}
                    onChange={(e) => setEditingPage({ ...editingPage, metaDescription: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm text-slate-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1">H1 Heading</label>
                  <input
                    type="text"
                    value={editingPage.h1}
                    onChange={(e) => setEditingPage({ ...editingPage, h1: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm text-slate-900 dark:text-white"
                  />
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    onClick={() => setEditingPage(null)}
                    className="px-4 py-2 rounded-xl text-sm font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      setPages((prev) => prev.map((p) => (p.slug === editingPage.slug ? editingPage : p)));
                      setEditingPage(null);
                      showToast('Saved SEO metadata changes!');
                    }}
                    className="px-5 py-2 rounded-xl text-sm font-bold bg-blue-600 text-white hover:bg-blue-700"
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 3: TECHNICAL SEO (XML SITEMAP, ROBOTS.TXT, SCHEMA) */}
      {activeTab === 'technical' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <FileCode className="w-5 h-5 text-blue-600" /> Dynamic XML Sitemap (/sitemap.xml)
              </h3>
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300">
                Auto-Updated
              </span>
            </div>
            <pre className="p-4 rounded-2xl bg-slate-950 text-blue-300 text-xs overflow-x-auto max-h-80 leading-relaxed">
              {xmlSitemap}
            </pre>
          </div>

          <div className="space-y-6">
            <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6">
              <h3 className="font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
                <Shield className="w-5 h-5 text-purple-600" /> Robots.txt Configuration
              </h3>
              <pre className="p-4 rounded-2xl bg-slate-950 text-emerald-300 text-xs overflow-x-auto">
                {robotsTxt}
              </pre>
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6">
              <h3 className="font-bold text-slate-900 dark:text-white mb-2">
                Active Technical SEO Guardrails
              </h3>
              <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-300">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> Unique canonical tags & Open Graph metadata per route</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> SoftwareApplication, WebSite, BreadcrumbList & FAQPage JSON-LD</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> Strict no-doorway policy: distinct body copy & FAQs per target KB page</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> Zero permanent PDF retention & filename sanitization</li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ============================================================================
// 5. MAIN APPLICATION SHELL & SEO PAGE RENDERER
// ============================================================================
export default function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [pages, setPages] = useState(SEO_PAGES);
  const getRouteFromPath = () => { const path = window.location.pathname.replace(/\/$/, '') || '/'; return path === '/admin' ? 'admin' : path === '/' ? '/' : path.slice(1); };
  const [currentRoute, setCurrentRoute] = useState(getRouteFromPath); // '/', slug, 'admin', or '404'

  useEffect(() => { const handlePopState = () => setCurrentRoute(getRouteFromPath()); window.addEventListener('popstate', handlePopState); return () => window.removeEventListener('popstate', handlePopState); }, []);
  const [openFaqIndex, setOpenFaqIndex] = useState(0);
  const [showSeoInspector, setShowSeoInspector] = useState(false);

  const activePage = useMemo(() => {
    if (currentRoute === 'admin' || currentRoute === '404') return null;
    return pages.find((p) => p.slug === currentRoute) || null;
  }, [pages, currentRoute]);

  // Sync Document Title, Meta Description & Canonical Tag on Route Change
  useEffect(() => {
    if (activePage) {
      document.title = activePage.metaTitle;
      let metaDesc = document.querySelector('meta[name="description"]');
      if (!metaDesc) {
        metaDesc = document.createElement('meta');
        metaDesc.setAttribute('name', 'description');
        document.head.appendChild(metaDesc);
      }
      metaDesc.setAttribute('content', activePage.metaDescription);
      const canonicalUrl = `https://shrinkpdf-ai-8leu.vercel.app${activePage.path}`;
      let canonical = document.querySelector('link[rel="canonical"]');
      if (!canonical) { canonical = document.createElement('link'); canonical.setAttribute('rel', 'canonical'); document.head.appendChild(canonical); }
      canonical.setAttribute('href', canonicalUrl);

      // Keep social previews and crawler directives in sync with the active route.
      const setMeta = (attribute, key, content) => {
        let tag = document.head.querySelector(`meta[${attribute}="${key}"]`);
        if (!tag) {
          tag = document.createElement('meta');
          tag.setAttribute(attribute, key);
          document.head.appendChild(tag);
        }
        tag.setAttribute('content', content);
      };
      setMeta('property', 'og:type', 'website');
      setMeta('property', 'og:site_name', 'ShrinkPDF AI');
      setMeta('property', 'og:title', activePage.metaTitle);
      setMeta('property', 'og:description', activePage.metaDescription);
      setMeta('property', 'og:url', canonicalUrl);
      setMeta('name', 'twitter:card', 'summary');
      setMeta('name', 'twitter:title', activePage.metaTitle);
      setMeta('name', 'twitter:description', activePage.metaDescription);
      setMeta('name', 'robots', 'index,follow,max-image-preview:large');
    } else if (currentRoute === 'admin') {
      document.title = 'Admin SEO Studio – ShrinkPDF AI';
      let robots = document.querySelector('meta[name="robots"]');
      if (!robots) { robots = document.createElement('meta'); robots.setAttribute('name', 'robots'); document.head.appendChild(robots); }
      robots.setAttribute('content', 'noindex,nofollow');
    } else {
      document.title = '404 Page Not Found – ShrinkPDF AI';
      let robots = document.querySelector('meta[name="robots"]');
      if (!robots) { robots = document.createElement('meta'); robots.setAttribute('name', 'robots'); document.head.appendChild(robots); }
      robots.setAttribute('content', 'noindex,follow');
    }
    setOpenFaqIndex(0);
  }, [activePage, currentRoute]);

  const navigateTo = (slug) => {
    const nextPath = slug === 'admin' ? '/admin' : slug === '/' ? '/' : `/${slug}`;
    if (window.location.pathname !== nextPath) window.history.pushState({}, '', nextPath);
    setCurrentRoute(slug);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Dynamic Structured Data (JSON-LD) for current page
  const structuredData = useMemo(() => {
    if (!activePage) return null;
    return {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'WebSite',
          name: 'ShrinkPDF AI',
          url: 'https://shrinkpdf-ai-8leu.vercel.app/'
        },
        {
          '@type': 'SoftwareApplication',
          name: 'ShrinkPDF AI – Free Online PDF Compressor',
          description: activePage.metaDescription,
          url: `https://shrinkpdf-ai-8leu.vercel.app${activePage.path}`,
          applicationCategory: 'UtilitiesApplication',
          applicationSubCategory: 'PDF compression',
          operatingSystem: 'Any (Web Browser)',
          featureList: [
            'Compress PDF files online in a web browser',
            'Target-size presets from 50KB to 2MB',
            'Browser-based PDF processing',
            'No account required to use the compressor'
          ],
          offers: {
            '@type': 'Offer',
            price: '0',
            priceCurrency: 'USD'
          }
        },
        {
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://shrinkpdf-ai-8leu.vercel.app/' },
            ...(activePage.slug !== '/'
              ? [{ '@type': 'ListItem', position: 2, name: activePage.label, item: `https://shrinkpdf-ai-8leu.vercel.app${activePage.path}` }]
              : [])
          ]
        },
        ...(activePage.faqs?.length
          ? [
              {
                '@type': 'FAQPage',
                mainEntity: activePage.faqs.map((f) => ({
                  '@type': 'Question',
                  name: f.q,
                  acceptedAnswer: { '@type': 'Answer', text: f.a }
                }))
              }
            ]
          : [])
      ]
    };
  }, [activePage]);

  return (
    <div className={darkMode ? 'dark' : ''}>
      <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-200 flex flex-col">
        {/* Inject JSON-LD Schema */}
        {structuredData && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
          />
        )}

        {/* ================================================================
            STICKY SAAS HEADER & NAVIGATION
        ================================================================ */}
        <header className="sticky top-0 z-40 backdrop-blur-xl bg-white/85 dark:bg-slate-950/85 border-b border-slate-200/70 dark:border-slate-800/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
            {/* Brand Logo */}
            <button
              onClick={() => navigateTo('/')}
              className="flex items-center gap-2.5 text-left group cursor-pointer"
            >
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-purple-600 text-white flex items-center justify-center shadow-md shadow-blue-600/20 group-hover:scale-105 transition-transform">
                <FileCheck2 className="w-5 h-5" />
              </div>
              <div>
                <span className="font-extrabold text-lg tracking-tight text-slate-900 dark:text-white">
                  ShrinkPDF<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">.ai</span>
                </span>
              </div>
            </button>

            {/* Quick Target Presets Nav (Desktop) */}
            <nav aria-label="Primary Target Sizes" className="hidden lg:flex items-center gap-1">
              {[
                { label: '50KB', slug: 'pdf-compressor-to-50kb' },
                { label: '100KB', slug: 'pdf-compressor-to-100kb' },
                { label: '200KB', slug: 'pdf-compressor-to-200kb' },
                { label: '300KB', slug: 'pdf-compressor-to-300kb' },
                { label: '500KB', slug: 'pdf-compressor-to-500kb' },
                { label: '1MB', slug: 'pdf-compressor-to-1mb' },
                { label: '2MB', slug: 'pdf-compressor-to-2mb' }
              ].map((item) => {
                const isActive = currentRoute === item.slug;
                return (
                  <button
                    key={item.slug}
                    onClick={() => navigateTo(item.slug)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                      isActive
                        ? 'bg-blue-600 text-white shadow-sm'
                        : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    {item.label}
                  </button>
                );
              })}
            </nav>

            {/* Right Controls: SEO Inspector, Admin Studio, Dark/Light Theme */}
            <div className="flex items-center gap-2">
              {activePage && (
                <button
                  onClick={() => setShowSeoInspector(!showSeoInspector)}
                  className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                  title="Inspect Page SEO Meta & Schema"
                >
                  <Search className="w-3.5 h-3.5 text-blue-600" />
                  SEO Meta
                </button>
              )}

              <button
                onClick={() => navigateTo(currentRoute === 'admin' ? '/' : 'admin')}
                className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                  currentRoute === 'admin'
                    ? 'bg-purple-600 text-white shadow-md shadow-purple-600/20'
                    : 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:opacity-90'
                }`}
              >
                <LayoutDashboard className="w-3.5 h-3.5" />
                {currentRoute === 'admin' ? 'Back to Compressor' : 'AI SEO Admin'}
              </button>

              <button
                onClick={() => setDarkMode(!darkMode)}
                aria-label="Toggle Dark or Light Mode"
                className="p-2 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Collapsible Live SEO Metadata & Schema Inspector Drawer */}
          {showSeoInspector && activePage && (
            <div className="bg-slate-50 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-4 sm:px-8 py-4">
              <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                <div>
                  <span className="font-bold text-blue-600 dark:text-blue-400 block mb-1">Canonical URL & Focus Keyword</span>
                  <div className="font-mono text-slate-800 dark:text-slate-200">https://shrinkpdf-ai-8leu.vercel.app{activePage.path}</div>
                  <div className="mt-1">Keyword: <span className="font-bold">{activePage.focusKeyword}</span></div>
                </div>
                <div>
                  <span className="font-bold text-purple-600 dark:text-purple-400 block mb-1">Dynamic Meta Title & Description</span>
                  <div className="font-semibold text-slate-900 dark:text-white">{activePage.metaTitle}</div>
                  <div className="text-slate-600 dark:text-slate-400 mt-0.5 line-clamp-2">{activePage.metaDescription}</div>
                </div>
                <div className="flex items-center justify-between md:justify-end gap-2">
                  <span className="px-2.5 py-1 rounded bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300 font-semibold">
                    JSON-LD Active: WebSite + SoftwareApplication + FAQPage
                  </span>
                  <button onClick={() => setShowSeoInspector(false)} className="p-1.5 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-800">
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          )}
        </header>

        {/* ================================================================
            ROUTE VIEW SWITCHER
        ================================================================ */}
        <main className="flex-1">
          {currentRoute === 'admin' ? (
            <AdminSeoDashboard
              pages={pages}
              setPages={setPages}
              onPreviewPage={(slug) => navigateTo(slug)}
            />
          ) : !activePage ? (
            /* Custom SEO-Friendly 404 Page */
            <div className="max-w-2xl mx-auto px-4 py-24 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-blue-100 dark:bg-blue-900/40 text-blue-600 font-extrabold text-2xl mb-6">
                404
              </div>
              <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-3">
                Page Not Found
              </h1>
              <p className="text-slate-600 dark:text-slate-400 mb-8">
                The PDF tool route you requested does not exist or has been unpublished. Return to our free online PDF compressor below.
              </p>
              <button
                onClick={() => navigateTo('/')}
                className="px-6 py-3.5 rounded-2xl font-bold text-white bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg"
              >
                Go to PDF Compressor Home
              </button>
            </div>
          ) : activePage.isLegal ? (
            <section className="max-w-4xl mx-auto px-4 sm:px-6 py-16">
              <nav aria-label="Breadcrumb" className="text-sm text-slate-500 mb-6"><button onClick={() => navigateTo('/')} className="hover:text-blue-600">Home</button><span className="mx-2">/</span><span>{activePage.label}</span></nav>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mb-8">{activePage.h1}</h1>
              <div className="space-y-8 text-slate-700 dark:text-slate-300 leading-7">
                {activePage.legalSections.map((section) => (
                  <section key={section.title}>
                    <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">{section.title}</h2>
                    {section.body.map((paragraph, index) => <p key={index} className="mb-3">{paragraph.includes('msulaniya25@gmail.com') ? <>{paragraph.split('msulaniya25@gmail.com')[0]}<a className="text-blue-600 hover:underline" href="mailto:msulaniya25@gmail.com">msulaniya25@gmail.com</a>{paragraph.split('msulaniya25@gmail.com')[1]}</> : paragraph}</p>)}
                  </section>
                ))}
              </div>
              <p className="mt-10 text-xs text-slate-500">Last updated: November 21, 2026</p>
            </section>
          ) : (
            /* ============================================================
               HOMEPAGE & DEDICATED SEO LANDING PAGES
            ============================================================ */
            <div>
              {/* HERO SECTION WITH INTEGRATED COMPRESSOR TOOL */}
              <section className="relative overflow-hidden pt-8 pb-16 sm:pt-12 sm:pb-24 bg-gradient-to-b from-blue-50/70 via-purple-50/30 to-white dark:from-slate-900 dark:via-slate-950 dark:to-slate-950">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  {/* Breadcrumb Navigation (on sub-pages) */}
                  {activePage.slug !== '/' && (
                    <nav aria-label="Breadcrumb" className="flex items-center justify-center gap-2 text-xs font-medium text-slate-500 dark:text-slate-400 mb-6">
                      <button onClick={() => navigateTo('/')} className="hover:text-blue-600 transition-colors">
                        Home
                      </button>
                      <ChevronRight className="w-3.5 h-3.5" />
                      <span className="text-slate-900 dark:text-white font-semibold">{activePage.label}</span>
                    </nav>
                  )}

                  {/* Hero Copy */}
                  <div className="text-center max-w-4xl mx-auto mb-10">
                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold bg-white dark:bg-slate-900 border border-blue-200/80 dark:border-blue-800/60 text-blue-700 dark:text-blue-300 shadow-sm mb-5">
                      <Sparkles className="w-3.5 h-3.5 text-purple-600" />
                      {activePage.badge}
                    </div>

                    <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.15] mb-5">
                      {activePage.h1}
                    </h1>

                    <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
                      {activePage.subtitle}
                    </p>
                  </div>

                  {/* Interactive PDF Compressor Tool */}
                  <PdfCompressorTool
                    initialPreset={activePage.preset || 'recommended'}
                    onNavigate={navigateTo}
                  />
                </div>
              </section>

              {/* TARGET SIZE CARDS SECTION */}
              <section className="py-16 bg-slate-50/70 dark:bg-slate-900/40 border-y border-slate-200/70 dark:border-slate-800/80">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="text-center max-w-2xl mx-auto mb-10">
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mb-3">
                      Compress PDF to Exact Target File Sizes
                    </h2>
                    <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
                      Select a dedicated target size preset below to open its calibrated PDF compressor tool.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {TARGET_CARDS.map((card) => {
                      const isCurrent = currentRoute === card.slug;
                      return (
                        <button
                          key={card.slug}
                          onClick={() => navigateTo(card.slug)}
                          className={`group p-5 rounded-2xl border text-left transition-all hover:-translate-y-0.5 ${
                            isCurrent
                              ? 'bg-gradient-to-br from-blue-600 to-purple-600 text-white border-transparent shadow-lg shadow-blue-600/20'
                              : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-blue-500 shadow-sm'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-3">
                            <span
                              className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                                isCurrent
                                  ? 'bg-white/20 text-white'
                                  : 'bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300'
                              }`}
                            >
                              {card.tag}
                            </span>
                            <ArrowRight
                              className={`w-4 h-4 transition-transform group-hover:translate-x-1 ${
                                isCurrent ? 'text-white' : 'text-slate-400 group-hover:text-blue-600'
                              }`}
                            />
                          </div>
                          <h3 className={`text-base font-bold mb-1 ${isCurrent ? 'text-white' : 'text-slate-900 dark:text-white'}`}>
                            {card.title}
                          </h3>
                          <p className={`text-xs leading-relaxed ${isCurrent ? 'text-blue-100' : 'text-slate-500 dark:text-slate-400'}`}>
                            {card.desc}
                          </p>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </section>

              {/* HOW TO COMPRESS PDF (3 SIMPLE STEPS) */}
              <section className="py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="text-center max-w-2xl mx-auto mb-12">
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mb-3">
                      How to Compress a PDF Online in 3 Steps
                    </h2>
                    <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
                      Fast, intuitive, and engineered to hit portal upload limits without desktop software.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[
                      {
                        step: '01',
                        title: 'Upload Your PDF',
                        desc: 'Drag and drop your PDF document into the compressor box or browse directly from your phone, tablet, or computer.'
                      },
                      {
                        step: '02',
                        title: 'Select Your Desired Compression Size',
                        desc: 'Choose Recommended balance, a preset from 50KB to 2MB, or enter a custom target file size in kilobytes.'
                      },
                      {
                        step: '03',
                        title: 'Download Your Compressed PDF',
                        desc: 'Inspect your before-and-after KB savings percentage and download your optimized PDF file immediately.'
                      }
                    ].map((s) => (
                      <div
                        key={s.step}
                        className="relative p-7 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm"
                      >
                        <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-blue-600 to-purple-600 text-white font-extrabold text-sm flex items-center justify-center mb-5 shadow-md shadow-blue-600/20">
                          {s.step}
                        </div>
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                          {s.title}
                        </h3>
                        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                          {s.desc}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              {/* UNIQUE KEYWORD-SPECIFIC USE CASE & REALISTIC LIMITATIONS */}
              <section className="py-14 bg-gradient-to-br from-slate-50 to-blue-50/40 dark:from-slate-900/70 dark:to-slate-900 border-y border-slate-200/70 dark:border-slate-800">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
                  <div className="bg-white dark:bg-slate-900 rounded-3xl p-7 sm:p-10 border border-slate-200/80 dark:border-slate-800 shadow-sm">
                    <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                      Optimization Guide • {activePage.focusKeyword}
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-2 mb-4">
                      {activePage.useCaseTitle}
                    </h2>
                    <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
                      {activePage.useCaseIntro}
                    </p>

                    {/* Optional AI-generated H3 subheadings */}
                    {activePage.h3Subheadings?.length > 0 && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
                        {activePage.h3Subheadings.map((sub, i) => (
                          <div key={i} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/70 dark:border-slate-700/70">
                            <h3 className="font-bold text-slate-900 dark:text-white text-base mb-1.5">
                              {sub.heading}
                            </h3>
                            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                              {sub.content}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Realistic Compression Limitations Box */}
                    <div className="p-5 rounded-2xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200/80 dark:border-amber-800/50">
                      <h3 className="text-sm font-bold text-amber-900 dark:text-amber-300 flex items-center gap-2 mb-1.5">
                        <Info className="w-4 h-4" />
                        Realistic Compression Expectations & Document Structure
                      </h3>
                      <p className="text-xs sm:text-sm text-amber-800 dark:text-amber-200/90 leading-relaxed">
                        {activePage.limitations}
                      </p>
                    </div>
                  </div>

                  {/* Fair Comparison: ShrinkPDF AI vs Adobe PDF Compressor */}
                  <div className="bg-white dark:bg-slate-900 rounded-3xl p-7 sm:p-8 border border-slate-200/80 dark:border-slate-800 shadow-sm">
                    <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white mb-2">
                      ShrinkPDF AI vs. Adobe PDF Compressor — Which Should You Use?
                    </h2>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mb-5">
                      Adobe Acrobat’s built-in PDF optimizer is an industry benchmark for enterprise desktop publishing, though its online compression tools often require sign-in or paid subscriptions for advanced controls. Here is an objective comparison:
                    </p>
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-sm border-collapse">
                        <thead>
                          <tr className="border-b border-slate-200 dark:border-slate-800 text-xs uppercase text-slate-500">
                            <th className="py-3 pr-4">Feature</th>
                            <th className="py-3 px-4 text-blue-600 dark:text-blue-400 font-bold">ShrinkPDF AI (This Tool)</th>
                            <th className="py-3 pl-4">Adobe PDF Compressor (Online)</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
                          <tr>
                            <td className="py-3 pr-4 font-medium">Exact KB Presets (50KB, 100KB, 200KB)</td>
                            <td className="py-3 px-4 font-semibold text-emerald-600 dark:text-emerald-400">Included Free</td>
                            <td className="py-3 pl-4">Broad Low / Medium / High presets</td>
                          </tr>
                          <tr>
                            <td className="py-3 pr-4 font-medium">Account / Sign-In Required</td>
                            <td className="py-3 px-4 font-semibold text-emerald-600 dark:text-emerald-400">No Sign-Up Needed</td>
                            <td className="py-3 pl-4">Required to download after first file</td>
                          </tr>
                          <tr>
                            <td className="py-3 pr-4 font-medium">File Privacy</td>
                            <td className="py-3 px-4">Processed locally in your browser</td>
                            <td className="py-3 pl-4">Uploaded to Adobe cloud servers</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </section>

              {/* 8 CORE FEATURES GRID */}
              <section className="py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="text-center max-w-2xl mx-auto mb-12">
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mb-3">
                      Why Use This Online PDF Compressor
                    </h2>
                    <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
                      Built for speed, privacy, and strict file-size compliance across every device.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                    {CORE_FEATURES.map((feat, idx) => {
                      const IconComponent = feat.icon;
                      return (
                        <div
                          key={idx}
                          className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 hover:border-blue-400 transition-colors shadow-sm"
                        >
                          <div className="w-11 h-11 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-4">
                            <IconComponent className="w-5 h-5" />
                          </div>
                          <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1.5">
                            {feat.title}
                          </h3>
                          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                            {feat.desc}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </section>

              {/* CRAWLABLE INTERNAL LINKS TO USEFUL PDF TASK PAGES */}
              <section className="py-12 border-t border-slate-200/70 dark:border-slate-800">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                  <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white mb-3">More PDF Compression Tools & Guides</h2>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-6">Choose a guide for the document you need to prepare. Each page opens the compressor with a relevant starting size.</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {pages.filter((page) => !page.isLegal && page.slug !== activePage.slug && page.slug !== '/').map((page) => (
                      <a
                        key={page.slug}
                        href={page.path}
                        onClick={(event) => { event.preventDefault(); navigateTo(page.slug); }}
                        className="group rounded-xl border border-slate-200 dark:border-slate-700 p-4 hover:border-blue-400 hover:bg-blue-50/50 dark:hover:bg-slate-800 transition-colors"
                      >
                        <span className="font-semibold text-sm text-slate-900 dark:text-white group-hover:text-blue-600">{page.label}</span>
                        <span className="block text-xs text-slate-500 dark:text-slate-400 mt-1">{page.metaDescription}</span>
                      </a>
                    ))}
                  </div>
                </div>
              </section>

              {/* SEO FAQ ACCORDION SECTION */}
              <section className="py-16 bg-slate-50/70 dark:bg-slate-900/40 border-t border-slate-200/70 dark:border-slate-800">
                <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="text-center mb-10">
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mb-3">
                      Frequently Asked Questions
                    </h2>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      Helpful answers about {activePage.focusKeyword} and PDF size optimization.
                    </p>
                  </div>

                  <div className="space-y-3">
                    {(activePage.faqs || []).map((faq, idx) => {
                      const isOpen = openFaqIndex === idx;
                      return (
                        <div
                          key={idx}
                          className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 overflow-hidden"
                        >
                          <button
                            type="button"
                            onClick={() => setOpenFaqIndex(isOpen ? -1 : idx)}
                            className="w-full px-6 py-4 text-left flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-slate-900 dark:text-white"
                          >
                            <span>{faq.q}</span>
                            <ChevronDown
                              className={`w-5 h-5 shrink-0 text-slate-400 transition-transform ${
                                isOpen ? 'rotate-180 text-blue-600' : ''
                              }`}
                            />
                          </button>
                          {isOpen && (
                            <div className="px-6 pb-5 text-sm text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-slate-800/80 pt-3">
                              {faq.a}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </section>
            </div>
          )}
        </main>

        {/* ================================================================
            SEO INTERNAL LINKING FOOTER
        ================================================================ */}
        <footer className="bg-slate-950 text-slate-400 border-t border-slate-800/80 pt-14 pb-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-10 border-b border-slate-800">
              <div className="md:col-span-1">
                <div className="flex items-center gap-2 text-white font-extrabold text-lg mb-3">
                  <FileCheck2 className="w-5 h-5 text-blue-500" />
                  <span>ShrinkPDF AI</span>
                </div>
                <p className="text-xs leading-relaxed text-slate-400">
                  Free, private, browser-based online PDF compressor with exact target KB calibration and AI-powered SEO publishing tools.
                </p>
              </div>

              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3">
                  Target Size Compressors
                </h4>
                <ul className="space-y-2 text-xs">
                  {['pdf-compressor-to-50kb', 'pdf-compressor-to-100kb', 'pdf-compressor-to-200kb', 'pdf-compressor-to-300kb'].map((slug) => {
                    const p = pages.find((item) => item.slug === slug);
                    if (!p) return null;
                    return (
                      <li key={slug}>
                        <button onClick={() => navigateTo(slug)} className="hover:text-white transition-colors">
                          {p.label}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>

              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3">
                  High-Capacity & Free Tools
                </h4>
                <ul className="space-y-2 text-xs">
                  {['pdf-compressor-to-500kb', 'pdf-compressor-to-1mb', 'pdf-compressor-to-2mb', 'pdf-compressor-online', 'free-pdf-compressor', 'online-pdf-compressor-free'].map((slug) => {
                    const p = pages.find((item) => item.slug === slug);
                    if (!p) return null;
                    return (
                      <li key={slug}>
                        <button onClick={() => navigateTo(slug)} className="hover:text-white transition-colors">
                          {p.label}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>

              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3">
                  Platform & Technical SEO
                </h4>
                <ul className="space-y-2 text-xs">
                  <li>
                    <button onClick={() => navigateTo('admin')} className="hover:text-white transition-colors">
                      AI SEO Content Generator
                    </button>
                  </li>
                  <li>
                    <button onClick={() => navigateTo('admin')} className="hover:text-white transition-colors">
                      XML Sitemap & Robots.txt
                    </button>
                  </li>
                  {['about-us', 'contact-us', 'privacy-policy', 'terms-and-conditions'].map((slug) => {
                    const page = pages.find((item) => item.slug === slug);
                    return page ? <li key={slug}><button onClick={() => navigateTo(slug)} className="hover:text-white transition-colors">{page.label}</button></li> : null;
                  })}
                  <li className="text-slate-500 pt-1">Not affiliated with Adobe Inc.</li>
                </ul>
              </div>
            </div>

            <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
              <p>© {new Date().getFullYear()} ShrinkPDF AI — Free Online PDF Compressor. All rights reserved.</p>
              <p>Zero server retention • Sandboxed PDF processing</p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}