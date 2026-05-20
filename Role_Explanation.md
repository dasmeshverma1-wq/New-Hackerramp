# Role & Persona Explanation

This document defines the roles, persona sub-groups, authorization states, and platform permissions implemented in the **Myntra Tech Week 2026** portal.

---

## 1. Role Matrix Overview

| Capability | Participant | Coordinator (Admin) | Mentor | Jury (Judge) |
| :--- | :---: | :---: | :---: | :---: |
| **Browse Overview & Timeline** | Yes | Yes | Yes | Yes |
| **Browse & Search Teams** | Yes | Yes | Yes | Yes |
| **Upvote & Submit Ideas** | Yes | Yes | Yes | Yes |
| **Create or Join a Team** | Yes | No | No | No |
| **Edit Team / Partner Info** | Yes (Owner) | Yes (Admin override) | No | No |
| **Play Quizzes & Post Memes** | Yes | Yes | Yes | No |
| **Moderate Bazaar Submissions**| No | Yes | No | No |
| **Score Teams (R1/R2/R3)** | No | Yes | No | Yes |
| **Publish Final Standings** | No | Yes | No | No |

---

## 2. Participant Personas (Hacker, Hustler, Designer)

To simulate cross-functional dynamics, participants are categorized into specific personas based on their department:

### A. The Hacker
*   **Target Departments**: Engineering, Data Science, SRE, InfoSec, Analytics.
*   **Responsibilities**: Technical architecture, coding prototypes, cloud deployments, scaling calculations, security checks.
*   **Platform Impact**: Cards display a purple badge. Under team constraints, a team requires at least one Hacker to be eligible for technical demo evaluation.

### B. The Hustler
*   **Target Departments**: Product, Business, Operations, Marketing, Finance, Customer Care.
*   **Responsibilities**: Customer metrics validation, financial impact modeling (GMV, NPS, CSAT, returns savings), presentation storyboards, shipping roadmap.
*   **Platform Impact**: Cards display an orange/amber badge. Under registration validation, a team must contain at least one Hustler to proceed to prototype verification (prevents pure engineering side-projects without market viability).

### C. The Designer
*   **Target Departments**: Design / UX.
*   **Responsibilities**: Design language, Figma wireframes, brand alignment, interaction animations, and micro-copy.
*   **Platform Impact**: Teams that include a Designer are eligible for the specialized **Best Design Award** (judged by the Chief Design Officer).

---

## 3. Administrative Roles

### A. Coordinator (Admin)
*   **Who they are**: Core team coordinators (e.g. `U003` - Rohit Kumar).
*   **Role**: They oversee registrations, handle approvals, and coordinate calendar sessions.
*   **Coordinator Exclusivity**: Coordinators are strictly prohibited from participating in or creating competitive teams to prevent conflicts of interest.

### B. Jury / Judge
*   **Who they are**: Senior architects, VPs, Directors, and C-Suite executives divided into panels.
*   **Structure**:
    *   **Round 1 Panel (Ideation)**: Architects and Associate Directors.
    *   **Round 2 Panel (Prototype)**: Engineering Directors & Senior Directors.
    *   **Round 3 Panel (Finale)**: C-Level executives (CEO, CTO, CBO, CMO) plus external guest investors evaluating in a "Shark Tank" format.
*   **Privilege**: Access to direct scoring logs via the Admin evaluation dashboard.

### C. Mentor
*   **Who they are**: Experienced engineering leads and product experts (e.g. `U005` - Vikram Mehta).
*   **Role**: Assigned to teams once they reach the Build phase to assist with API setups, review pitches, and facilitate InfoSec clearance overrides.
