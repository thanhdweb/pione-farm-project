'use client';

import React, { useState } from 'react';
import { ethers } from 'ethers';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ConnectWallet = () => {
  const [account, setAccount] = useState<string | null>(null);

  const connectWallet = async () => {
    if (typeof window.ethereum !== 'undefined') {
      try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const accounts: string[] = await provider.send('eth_requestAccounts', []);
        setAccount(accounts[0]);
        toast.success('Kết nối ví thành công!');
      } catch (err) {
        // ép kiểu lỗi rõ ràng
        const error = err as { message?: string };
        console.error('Lỗi kết nối ví:', error);
        toast.error(error?.message || 'Không thể kết nối ví. Vui lòng thử lại.');
      }
    } else {
      toast.warning('MetaMask chưa được cài đặt!');
    }
  };

  return (
    <div className="p-4 flex items-center justify-center min-h-[100px]">
      {/* <ToastContainer /> */}
      {account ? (
             <div className="text-green-600 font-semibold">
          Đã kết nối: {account.slice(0, 6)}...{account.slice(-4)}
        </div>
      ) : (
        <button
          onClick={connectWallet}
          className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold rounded-xl shadow-lg transition-all duration-300"
        >
        Kết nối ví MetaMask
        </button>
      )}
    </div>
  );
};

export default ConnectWallet;