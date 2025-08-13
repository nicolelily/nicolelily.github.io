---
layout: archive
title: "CV"
permalink: /cv-json/
author_profile: false
redirect_from:
  - /resume-json
---

{% include base_path %}

<link rel="stylesheet" href="{{ base_path }}/assets/css/cv-style.css">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css">

<style>
  .archive {
    width: 80%;
    margin: 0 auto;
    float: none;
    padding-right: 0;
  }
  
  @media (min-width: 80em) {
    .archive {
      width: 70%;
    }
  }

  /* Dark theme support for CV page */
  html[data-theme="dark"] .cv-container {
    color: var(--global-text-color);
  }

  html[data-theme="dark"] .cv-item-date,
  html[data-theme="dark"] .cv-item-subtitle,
  html[data-theme="dark"] .cv-section h2 i,
  html[data-theme="dark"] .cv-language-fluency,
  html[data-theme="dark"] .cv-references {
    color: var(--global-text-color-light);
  }

  html[data-theme="dark"] .cv-skill-category h3,
  html[data-theme="dark"] .cv-interest h3 {
    color: var(--global-text-color);
  }

  html[data-theme="dark"] .cv-header-nav,
  html[data-theme="dark"] .cv-download-links {
    border-color: var(--global-border-color);
  }
</style>

{% include cv-template.html %}

<div class="cv-download-links">
  <a href="{{ base_path }}/files/cv.pdf" class="btn btn--primary">Download CV as PDF</a>
  <a href="{{ base_path }}" class="btn btn--inverse">View Markdown CV</a>
</div>
