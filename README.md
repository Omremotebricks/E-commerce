# E-Commerce (React + Vite)

This is a small e-commerce front-end built with React, Vite, Tailwind, and Redux Toolkit. It includes core shopping flows (browse, search, filter, product details, cart) and a Razorpay-based payment helper.
**Quick overview**
- **Tech:** React, Vite, Tailwind CSS, Redux Toolkit, redux-persist, Axios.
- **Payment:** Razorpay checkout integration (client-side helper in src/utils/payment.js).
**Features**
- Browse products with pagination, search, filter, and sort.
- Product details page with images and reviews.
- Cart with add/remove, quantity handling and a checkout flow.
- Theme toggle (light / dark) persisted across sessions.
- Reusable theme-aware Loader component used across pages.

**Important files**
- App entry: [src/main.jsx](src/main.jsx)
- Routes: [src/routes/AppMain.jsx](src/routes/AppMain.jsx)
- Pages: [src/pages/Products.jsx](src/pages/Products.jsx), [src/pages/ProductDetails.jsx](src/pages/ProductDetails.jsx), [src/pages/CartPage.jsx](src/pages/CartPage.jsx), [src/pages/Home.jsx](src/pages/Home.jsx)
- Components: [src/components/Header.jsx](src/components/Header.jsx), [src/components/ProductCard.jsx](src/components/ProductCard.jsx), [src/components/Loader.jsx](src/components/Loader.jsx)
- State: [src/store/store.js](src/store/store.js), [src/store/slice/getProductSlice.js](src/store/slice/getProductSlice.js)
- API helper: [src/api/getproducts.js](src/api/getproducts.js)
- Payment helper: [src/utils/payment.js](src/utils/payment.js)

## Requirements
- Node.js (v18+ recommended)
- npm or yarn

## Setup
1. Install dependencies:

```bash
npm install
```

2. Create a `.env` file in project root (Vite uses `import.meta.env`). Add any required keys, for example:

```env
VITE_RAZORPAY_KEY_ID=your_razorpay_key_here
```

The project includes the Razorpay checkout script in `index.html`:

- [index.html](index.html) already loads `https://checkout.razorpay.com/v1/checkout.js`.

## Scripts
- Start dev server: `npm run dev`
- Build production bundle: `npm run build`
- Preview production build: `npm run preview`
- Lint: `npm run lint`

## Development notes
- API: The app fetches data from `https://dummyjson.com/products` via [src/api/getproducts.js](src/api/getproducts.js).
- Redux: Product list and single-product responses are handled by a shared thunk (`apiProduct`) in [src/store/slice/getProductSlice.js](src/store/slice/getProductSlice.js).
- Persistence: `redux-persist` is used for `auth` and `theme` (configured in [src/store/store.js](src/store/store.js)).
- Loader: Use the reusable loader component [src/components/Loader.jsx](src/components/Loader.jsx) to show consistent loading UI.
- Theme: Toggle available in header; dark mode adjusts many components and native form controls use `style={{ colorScheme: mode }}` for better browser compatibility.

## Payment / Checkout
- The client-side helper is in [src/utils/payment.js](src/utils/payment.js). It expects `VITE_RAZORPAY_KEY_ID` in the environment and the Razorpay script to be loaded. The helper accepts an `onSuccess` callback so callers (e.g., CartPage) can clear carts or navigate after payment.

## Project structure
Top-level important folders:
- `src/pages/` — page-level routes and views
- `src/components/` — reusable UI components
- `src/store/` — Redux store and slices
- `src/api/` — API helpers
- `src/utils/` — utility helpers (payment, validation)

## Known notes & tips
- Native `<select>` and `<input>` elements may render their own dropdowns in light mode on some browsers — this project adds `style={{ colorScheme: mode }}` to those controls to improve dark-mode compatibility.
- If you change persisted reducer keys, review `src/store/store.js` for `persistConfig` entries.

## Next steps you might want
- Add tests (Jest / React Testing Library).
- Add a dedicated payment success page and server-side verification for payments.
- Improve accessibility on interactive controls.

If you want, I can expand this README with deployment steps (Netlify/Vercel), API mocking instructions, or contributor guidelines.
# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
