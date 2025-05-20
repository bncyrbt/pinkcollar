# 🧵 Pinkcollar

_A decentralized social network for fashion creators, collaborators, and fans._

**Please see attached pdf slideshow**

## 🚡 Table of Contents

1. [About Pinkcollar](#about-pinkcollar)
2. [Features](#features)
3. [Demo](#demo)
4. [Tech Stack](#tech-stack)
5. [Getting Started](#getting-started)
6. [Architecture Overview](#architecture-overview)
7. [Smart Contracts](#smart-contracts)
8. [Project Structure](#project-structure)
9. [Contributing](#contributing)
10. [License](#license)
11. [Team & Credits](#team--credits)

---

## 📌 About Pinkcollar

**Pinkcollar** is a decentralized social platform built for fashion creators, by fashion creators. It transforms the way fashion work is documented, credited, and shared.

Instead of flattening creative contributions into a single post, Pinkcollar breaks it open: **every garment is a collaboration** — and now, every role is visible. From designer and pattern maker to stylist, sewer, and photographer — all are credited, permanently.

The platform is built on top of [Lens Protocol](https://lens.xyz), ensuring that contributions, collections, and interactions are decentralized, secure, and ownable.

> _“Pinkcollar is where fashion meets provenance. Every stitch tells a story — and every story has its contributors.”_

---

## ✨ Features

### 🧵 Collaborative Posts

- Create a garment post and invite contributors to add their role and optional notes.
- Each contributor is shown on the post with a profile link and role (e.g., Designer, Stylist, Pattern Maker).
- Contributors are permanently linked to the post in metadata.

### 📷 Process Logging

- Document the behind-the-scenes journey of creation.
- Add sketches, reference photos, fabric choices, or journal-style entries.
- Viewers can explore the development of a garment from idea to final piece.

### 👥 Contributors Section

- Every post includes a visible list of contributors.
- Contributors can accept or decline participation invites.
- Roles and comments help contextualize what each person did.

### 📂 Collections

- Users can organize content into curated folders:

  - **Collected** (private default)
  - **Curated** (public curated set on your profile)
  - **Custom Collections** (e.g., "Fall '25 Moodboard")

### 🔹 Collect to Interact

- To engage with a post (like, comment, repost), users must first collect it.
- Collecting gives the user a copy of the post NFT and logs their interaction.
- After collecting, users can also publish the post to one of their collections.
- Collecting a post on the platforms distributes the rewards among the creator, contributors, fans and app treasury.

### 🔗 Lens Protocol Integration

- How Lens primitives are used in Pinkcollar

  - Lens Feed - Pinkcollar uses a main feed where all content is streaming
  - Lens Post - Pinkcollar posts are evolving posts, users are encouraged to
    expand existing stories and processes instead of creating disposable content
  - Lens Group - we use groups to establish the relationship between a Contribution Group
    and a Post.
  - Lens Comments - comments are used not only as a simple way to react, but as a container for a rich data structure
    that holds data from different aspects of the process. each comment can belong to different information block on the screen.
    one comment can hold ProcessLogItem while other can be StichHighlight and so on. when rendered, the ui is composed of different
    blocks that together tells the never ending story of the story.
  - Lens Namespace - Pinkcollar uses its own namespace, to build rich community of professionals and lovers.

### 🔍 Explore Feed

- A curated stream of content across the network.
- Highlights new creators, trending pieces, and collaborative garments.
- Includes search and filter by role, tag, or post type.

### 👤 Profile Pages

- Users have personalized pages that include:

  - Their original posts
  - Contributions to other posts
  - Collected and curated content
  - Follower/following lists

### 🌈 Visual-first UI

- Clean, modern layout designed to center visual work.
- Responsive three-column feed, modal interactions, and smooth animations.
- Real-time state updates powered by Zustand.

## 🛠️ Tech Stack

| Area             | Tech                                        |
| ---------------- | ------------------------------------------- |
| Frontend         | Next.js 15, TypeScript, Tailwind, ShadCN UI |
| State Management | Zustand                                     |
| Web3 Integration | Lens SDK, Wagmi, ConnectKit                 |
| Smart Contracts  | Lens V3                                     |
| Styling          | Tailwind CSS + custom components            |

---

## 🚀 Getting Started

### Prerequisites

- Node.js ≥ 18
- Yarn / npm
- Wallet (MetaMask or similar)
- Access to a Lens profile

### Installation

```bash
git clone https://github.com/bncyrbt/pinkcollar.git
cd pinkcollar
npm install
```

### Running Locally

```bash
next dev
```

### Environment Variables

A sample environment file is provided under ci.env. To run the project locally, copy it into .env.local using the following command:

cp ci.env .env.local

You can then adjust any values as needed.

### Key On-Chain Concepts:

- **Posts** are NFTs — composable, ownable content pieces
- **Collecting** a post:

  - Saves it to your profile
  - Unlocks actions like liking, commenting, or publishing in a public collection

- **Contributors** are stored as metadata attributes on each post

  - Each with a **role** and optional comment
  - Appear on post detail page and contributor profiles

### Possible Future Contracts:

- Contributor Reputation (based on verified participation)
- Post Provenance Chain (to track derived works and remixes)

## 🧑‍🎨 Team & Credits

- **Tomer Even Ari** – Design, Vision, Architecture
- **Yarin Caro** – Engineering, Smart Contracts, Infrastructure

---
