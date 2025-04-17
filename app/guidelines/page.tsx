"use client";

import React from "react";

function CommunityGuidelines() {
  return (
    <div className="container mx-auto p-8 max-w-3xl">
      <h1 className="text-3xl font-semibold mb-6 text-blue-600">
        Community Guidelines
      </h1>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Respect and Kindness</h2>
        <p className="text-gray-700 leading-relaxed">
          We expect all members of our community to treat each other with
          respect and kindness. Harassment, bullying, and hate speech will not
          be tolerated.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">
          Authenticity and Honesty
        </h2>
        <p className="text-gray-700 leading-relaxed">
          Please be authentic and honest in your interactions. Misleading
          information, spam, and impersonation are not allowed.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Content Guidelines</h2>
        <p className="text-gray-700 leading-relaxed">
          Share content that is relevant and appropriate for our community.
          Please refrain from posting offensive, explicit, or illegal material.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Reporting Violations</h2>
        <p className="text-gray-700 leading-relaxed">
          If you encounter content or behavior that violates these guidelines,
          please report it to our moderation team. We are committed to
          maintaining a safe and positive environment.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Consequences</h2>
        <p className="text-gray-700 leading-relaxed">
          Violations of these guidelines may result in warnings, temporary
          suspensions, or permanent account termination. We reserve the right to
          take appropriate action to protect our community.
        </p>
      </section>
    </div>
  );
}

export default CommunityGuidelines;
