# MATRA-X Deployment

## Current live application
https://matra-x-vision-core.base44.app/

## GitHub repository
This repository is the SIH submission/documentation layer for the current live application. The public Base44 URL does not expose the private application source tree.

## Vercel front door
The repository contains vercel.json which redirects all paths to the live MATRA-X URL. This can provide a project-owned Vercel URL for the SIH QR while retaining the current hosted application.

## Automated report/video pipeline
.github/workflows/publish-sih-assets.yml generates the technical report PDF, user manual PDF and a live browser-capture video.

## 24/7 access
The current hosted application is publicly addressable through its Base44 URL. A truly independent always-on deployment requires an authorized source export plus a production database/backend environment.

## QR
Encode the final HTTPS evaluator URL, never localhost or 127.0.0.1.