import pandas as pd
import numpy as np

np.random.seed(42)

def generate_churn_data(n_samples=1000):
    data = {
        'engagement_score': np.random.uniform(0, 1, n_samples),
        'nps_score': np.random.randint(-100, 100, n_samples),
        'product_adoption_rate': np.random.uniform(0, 1, n_samples),
        'payment_failures': np.random.randint(0, 10, n_samples),
        'support_tickets_last_30d': np.random.randint(0, 50, n_samples),
        'customer_age_months': np.random.randint(1, 60, n_samples),
        'cac_payback_months': np.random.uniform(3, 24, n_samples),
        'active_users_ratio': np.random.uniform(0, 1, n_samples),
        'contract_length_months': np.random.randint(1, 36, n_samples),
        'churn_risk_flag': np.random.randint(0, 2, n_samples),
    }
    
    churn_list = []

    for i in range(n_samples):
        churn_prob = 0.20
        
        if data['engagement_score'][i] < 0.3:
            churn_prob += 0.35
        elif data['engagement_score'][i] > 0.7:
            churn_prob -= 0.15
        
        if data['nps_score'][i] < 0:
            churn_prob += 0.25
        elif data['nps_score'][i] > 50:
            churn_prob -= 0.15
        
        if data['product_adoption_rate'][i] < 0.2:
            churn_prob += 0.20
        elif data['product_adoption_rate'][i] > 0.7:
            churn_prob -= 0.10
        
        if data['payment_failures'][i] > 5:
            churn_prob += 0.20
        elif data['payment_failures'][i] == 0:
            churn_prob -= 0.10
        
        if data['support_tickets_last_30d'][i] > 30:
            churn_prob += 0.15
        elif data['support_tickets_last_30d'][i] < 3:
            churn_prob -= 0.05
        
        if data['customer_age_months'][i] < 3:
            churn_prob += 0.20
        elif data['customer_age_months'][i] > 24:
            churn_prob -= 0.15
        
        if data['cac_payback_months'][i] > 15:
            churn_prob += 0.10
        elif data['cac_payback_months'][i] < 6:
            churn_prob -= 0.05
        
        if data['active_users_ratio'][i] < 0.2:
            churn_prob += 0.15
        elif data['active_users_ratio'][i] > 0.8:
            churn_prob -= 0.10
        
        if data['contract_length_months'][i] == 1:
            churn_prob += 0.10
        elif data['contract_length_months'][i] >= 24:
            churn_prob -= 0.10
        
        if data['churn_risk_flag'][i] == 1:
            churn_prob += 0.25
        
        churn_prob = min(max(churn_prob, 0), 1.0)
        
        churn = 1 if np.random.rand() < churn_prob else 0
        churn_list.append(churn)
    
    data['churn'] = churn_list
    
    return pd.DataFrame(data)

if __name__ == '__main__':
    df = generate_churn_data(n_samples=1000)
    
    df.to_csv('data/churn_dataset.csv', index=False)
    
    print("✓ Dataset generated successfully!")
    print(f"✓ Total samples: {len(df)}")
    print(f"✓ Features: {df.shape[1]}")
    print(f"✓ Churn rate: {df['churn'].mean():.2%}")
    print(f"✓ Saved to: data/churn_dataset.csv")
    print(f"\nFirst 5 rows:")
    print(df.head())
    print(f"\nDataset info:")
    print(df.info())
    print(f"\nChurn distribution:")
    print(df['churn'].value_counts())