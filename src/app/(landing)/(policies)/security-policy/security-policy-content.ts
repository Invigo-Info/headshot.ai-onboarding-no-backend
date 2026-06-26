import { format } from "date-fns";

const currentDate = new Date();

export const securityPolicyContent = `
**Effective Date:** ${format(currentDate, "MMMM d, yyyy")}

At Headshot.ai, safeguarding your data is our top priority. This policy outlines the technical and organizational safeguards we implement to protect your personal and photographic information from unauthorized access, alteration, or misuse — without reliance on our infrastructure.

---

## 1\. Organizational Security Teams

* We maintain a dedicated security operations team composed of professionals with extensive experience in secure system design, penetration testing, and incident response.

* All team members undergo continuous security training and follow strict internal protocols to ensure vigilance.

---

## 2\. Incident Response & Monitoring

* We operate a formal **Incident Response Plan**:

  * Any suspected security incident triggers immediate escalation.

  * A rapid-response team assesses, contains, and resolves incidents.

  * Issues are documented and analyzed, with actionable learnings disseminated internally to prevent recurrence.

* We will notify affected users **promptly** in writing in the event of a confirmed breach impacting sensitive data, with regular updates on investigation status and remediation steps.

---

## 3\. Secure Development & Deployment

* Our systems deploy using containerized infrastructure and automated CI/CD pipelines.

* Changes to production systems go through code reviews, automated testing, and staged rollouts.

* Quick rollback mechanisms and hotfix capabilities enable us to react swiftly to security vulnerabilities.

---

## 4\. Authentication & Access Control

* All system access requires **multi-factor authentication (MFA)** and strong password policies.

* Role-Based Access Control (RBAC) ensures access is limited to only those who need it.

* Privilege escalation is strictly controlled; elevated access is temporary and audit-logged.

---

## 5\. Infrastructure & Data Hosting

* Headshot.ai runs on managed hosting platforms selected for their compliance with industry best practices

* Data is encrypted at rest using AES-256 in secure on-premises or certified hosting environments.

* Full environment backups are created regularly and securely stored off-site.

---

## 6\. Application Monitoring & Logging

* We utilize tools like Sentry and system-level monitoring to detect and alert on anomalous behavior in real time.

* All access to production systems, content management consoles, and sensitive databases is logged and monitored.

* API requests, user actions, and internal administration actions are logged for traceability.

---

## 7\. Data Segregation & Isolation

* User data is stored in logically-separated multi-tenant databases; users cannot access each other’s data.

* Access controls in the codebase reinforce strict segregation at the application layer.

* Sensitive material such as raw uploads, generated outputs, and metadata is encrypted and stored securely.

---

## 8\. Encryption & Transport Security

* All web traffic and API endpoints are served over **HTTPS/TLS only**.

* Sensitive data in transit is secured end-to-end.

* File uploads, downloads, and image delivery use TLS encryption by default.

---

## 9\. Disaster Recovery & Business Continuity

* We maintain full backups of user content and system configurations stored in multiple geographic locations.

* We regularly test our disaster recovery procedures to ensure fast recovery with minimal downtime.

* Data redundancy and failover tests are part of our operational routines.

---

## 10\. Vendor Management & Third-Party Processors

* If we engage third-party providers for services like image processing, storage, or analytics, they are vetted for robust security practices.

* Contractors sign **Data Processing Agreements (DPAs)** to abide by privacy regulations.

* No third-party service receives access beyond what’s strictly necessary to perform its service.

---

## 11\. Compliance & Certifications

* While not operating on AWS, we align with recognized frameworks such as SOC 2 Type II, ISO 27001, and GDPR best practices.

* Independent audits are conducted regularly to ensure compliance.

* We maintain internal documentation of all security controls, policies, and procedures.

---

## 12\. User Safety & Support

* We limit all production data access to essential systems and authorized personnel only.

* Users are encouraged to report suspicious behavior or security concerns via security@headshot.ai.

* We respond to vulnerability reports and data access requests promptly and transparently.

---

## 13\. Regular Testing & Security Hardening

* Our infrastructure undergoes periodic **vulnerability assessments**, including external penetration tests.

* Codebases, libraries, and frameworks are regularly updated and patched.

* All secrets (API keys, certificates, credentials) are stored in secure vaults and rotated regularly.

`