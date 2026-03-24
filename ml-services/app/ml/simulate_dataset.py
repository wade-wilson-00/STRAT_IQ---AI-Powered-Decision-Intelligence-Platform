import numpy as np
import pandas as pd

months = 72
data = []

users = 500
mrr = 500000
cac = 1200 
for month in range(months):
    churn_rate = np.random.uniform(0.02, 0.06)
    new_users = np.random.randint(40, 90) 
    
    churned_users = int(users * churn_rate)
    users = users + new_users - churned_users
    
    mrr = users * 1000
    marketing_spend = new_users * cac
    burn_rate = marketing_spend + np.random.randint(200000, 300000)
    
    data.append([
        month, mrr, users, cac, churn_rate, marketing_spend, burn_rate
    ])

df = pd.DataFrame(data, columns=[
    "month", "mrr", "active_users", "cac",
    "churn_rate", "marketing_spend", "burn_rate"
])

df.to_csv("startup_metrics.csv", index=False)
df