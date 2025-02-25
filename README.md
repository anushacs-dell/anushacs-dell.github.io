# ZOO-Project Website

The official ZOO-Project website built with the Hugo framework.
This repository contains the code of the Zoo-Project project website: https://anushacs-dell.github.io/

## ZOO-Project Hugo Theme

This repository contains the ZOO-Project Hugo Theme, inspired by Luke's original design. It is customized for the ZOO-Project website, providing a modern, responsive layout to showcase the platform's resources, documentation, and community contributions.

## Adding a New Page
To add a new page to the website:

### 1. Create a new Markdown file:

* Navigate to the content directory.
* Create a new .md file inside the appropriate folder (e.g., content/resources/).
* Example: touch content/resources/new-page.md

### 2. Add front matter at the top of your file:
+++
title = "New Page Title"
date = "2025-02-20"
draft = false
+++

### 3. Write your content using Markdown syntax.

### 4. Commit and push changes:
git add content/resources/new-page.md
git commit -m "Add new page: New Page Title"
git push

## Updating Page Content

### 1. Locate the existing Markdown file in the content directory.

### 2. Edit the file with your changes.

### 3. Commit and push the updates:
git commit -am "Update: Improved content for [Page Title]"
git push
