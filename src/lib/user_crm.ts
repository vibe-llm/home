export interface UserWallet {
  total_deposit: number
  total_spent: number
  balance: number
}

// Helper functions for UserWallet calculations and formatting
export const walletHelpers = {
  // Calculate balance remaining (total_deposit - total_spend)
  getBalanceRemaining: (wallet: UserWallet): string => {
    const balance = wallet.total_deposit - wallet.total_spent;
    return `$${balance.toFixed(2)}`;
  },

  // Format total spend as currency
  getTotalSpendFormatted: (wallet: UserWallet): string => {
    if (!wallet.total_spent) {
      return '$0.00';
    }
    return `$${wallet.total_spent.toFixed(2)}`;
  },

  // Calculate tokens remaining based on balance (1M tokens = ~$3.8)
  getTokensRemaining: (wallet: UserWallet): string => {
    const balanceRemaining = wallet.total_deposit - wallet.total_spent;
    const tokensRemaining = Math.floor((balanceRemaining / 3.8) * 1000000);
    
    if (tokensRemaining >= 100000) {
      return `~${(tokensRemaining / 1000000).toFixed(2)} M`;
    } else if (tokensRemaining >= 100) {
      return `~${(tokensRemaining / 1000).toFixed(2)} K`;
    } else if (tokensRemaining > 0) {
      return `~${tokensRemaining.toString()}`;
    } else {
      return `0`;
    }
  }
};
