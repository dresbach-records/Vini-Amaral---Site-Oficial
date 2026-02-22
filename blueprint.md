# Vini Amaral - Fan Club Website

## Overview

This project is a Next.js website for the melodic rock artist Vini Amaral. It serves as a hub for fans, providing information about the artist, his music, and exclusive content for fan club members. The website also features a fully functional e-commerce store for merchandise.

## Features

*   **Home Page:** A landing page with a hero section, artist bio, album information, and contact form.
*   **Fan Club:** An exclusive area for fans with a login and registration system. It provides access to lyrics, phonetics, behind-the-scenes content, and more.
*   **Fan Club Store:** A complete e-commerce experience for fans to purchase merchandise.
    *   **Product Grid:** A visually appealing grid of products with filtering options.
    *   **Product Card Component:** A reusable component for displaying product information, including name, price, and an "Add to Cart" button.
    *   **Shopping Cart:** A functional shopping cart that allows users to add, remove, and view items.
    *   **Cart Drawer:** A sliding drawer that provides a quick view of the cart without leaving the current page.
    *   **Toast Notifications:** User-friendly notifications for actions like adding an item to the cart.
*   **Checkout:** A fully functional, multi-step checkout page for purchasing merchandise, with support for credit cards, PIX, and Boleto.

## Design

*   **Theme:** A modern and elegant design with a dark color palette, gold accents, and a noise texture background.
*   **Typography:** A combination of Playfair Display, Cormorant Garamond, and Oswald fonts for a sophisticated and readable experience.
*   **Iconography:** Modern and interactive icons to enhance user understanding and navigation.
*   **Interactivity:** Smooth animations, transitions, and interactive elements to create a dynamic and engaging user experience.

## Current Plan: Enhance the Fan Club Store

This is the current plan to enhance the Fan Club Store:

1.  **Restructure the Store Layout:**
    *   Create a more intuitive and visually appealing layout for the main store page (`/fan-club-store`).
    *   Implement a clear header with navigation and a cart icon.
    *   Add a hero section to showcase featured products or promotions.
    *   Create a filter bar to allow users to sort and filter products.

2.  **Componentize Store Elements:**
    *   Create a `ProductCard` component to display individual products. This component will have its own CSS module for styling.
    *   Create a `CartDrawer` component to provide a slide-in cart view. This component will have its own CSS module.
    *   Create a `Toast` component for user notifications. This component will have its own CSS module.

3.  **Implement Shopping Cart Functionality:**
    *   Add state management for the shopping cart to handle adding, removing, and updating items.
    *   Connect the "Add to Cart" button on the `ProductCard` to the cart state.
    *   Display the number of items in the cart on the cart icon in the header.

4.  **Build the Checkout Page:**
    *   Create a new page at `/checkout` with a multi-step checkout process.
    *   Design and implement forms for shipping and payment information.
    *   Ensure the checkout process is secure and user-friendly.

5.  **Fix Existing Errors:**
    *   Address the Eslint errors related to component creation during render and other warnings.
