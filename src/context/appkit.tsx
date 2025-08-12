"use client";

import { ReactNode } from "react";
import { createAppKit } from "@reown/appkit/react";
import { EthersAdapter } from "@reown/appkit-adapter-ethers";
import { mainnet, arbitrum } from "@reown/appkit/networks";
import { Chain } from "viem";

const projectId = "4a80ae7f293570561530d90deb0dcb61";

const metadata = {
  name: "My Website",
  description: "My Website description",
  url:
    typeof window !== "undefined"
      ? window.location.origin
      : "https://mywebsite.com",
  icons: ["https://mywebsite.com/icon.png"],
};

const pioneZeroChain: Chain = {
  id: 5080,
  name: "Pione Zero Chain",
  nativeCurrency: { name: "Pione Zero", symbol: "PZO", decimals: 18 },
  rpcUrls: {
    default: { http: ["https://rpc.zeroscan.org"] },
    public: { http: ["https://rpc.zeroscan.org"] },
  },
  blockExplorers: {
    default: { name: "Zeroscan", url: "https://zeroscan.org" },
  },
};

// --- 1. Xóa hết session AppKit/Wagmi trước khi init ---
if (typeof window !== "undefined") {
  Object.keys(localStorage).forEach((key) => {
    if (
      key.startsWith("@appkit/") ||
      key.startsWith("wagmi.store")
    ) {
      localStorage.removeItem(key);
    }
  });
}

export const appKit = createAppKit({
  adapters: [new EthersAdapter()],
  metadata,
  networks: [mainnet, arbitrum, pioneZeroChain],
  projectId,
  features: { analytics: true },
});


// Hàm logout/disconnect có thể gọi ở nút "Disconnect"
export function clearSession() {
  appKit.disconnect().then(() => {
    Object.keys(localStorage).forEach((key) => {
      if (key.startsWith("@appkit/") || key.startsWith("wagmi.store")) {
        localStorage.removeItem(key);
      }
    });
  });
}

export function AppKitProvider({ children }: { children: ReactNode }) {
    return <>{children}</>;
}
