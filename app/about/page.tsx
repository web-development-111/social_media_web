"use client";

import React from "react";

function AboutUs() {
  return (
    <div className="container mx-auto p-8 max-w-3xl">
      <h1 className="text-3xl font-semibold mb-6">About Our Community</h1>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 ">Our Mission</h2>
        <p className="text-gray-700 dark:text-gray-200 leading-relaxed">
          We believe in connecting people through shared experiences and
          fostering a positive online community. Our platform is designed to
          empower users to express themselves, share their stories, and engage
          with others in meaningful ways.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Our Story</h2>
        <p className="text-gray-700 dark:text-gray-200 leading-relaxed">
          This platform was born from the idea that everyone has a story to
          tell. We wanted to create a space where these stories could be shared,
          celebrated, and discovered. From our humble beginnings, we&apos;ve
          grown into a vibrant community, and we&apos;re excited to see where
          the journey takes us.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Our Team</h2>
        <p className="text-gray-700 dark:text-gray-200 leading-relaxed">
          We&apos;re a passionate team of developers, designers, and community
          enthusiasts dedicated to creating a safe and engaging platform for our
          users. We&apos;re constantly working to improve and innovate, ensuring
          that our community remains a welcoming and inclusive space for
          everyone.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
        <p className="text-gray-700 leading-relaxed dark:text-gray-200">
          Have questions or feedback? We&apos;d love to hear from you! Please
          reach out to us at{" "}
          <a
            href="mailto:support@ourcommunity.com"
            className="text-blue-600 hover:underline"
          >
            support@ourcommunity.com
          </a>
          .
        </p>
      </section>
    </div>
  );
}

export default AboutUs;
