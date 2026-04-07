import os
import numpy as np
import pandas as pd
from sklearn.base import BaseEstimator, TransformerMixin

class ChurnFeatureEngineering(BaseEstimator, TransformerMixin):
    def fit(self, X, y=None):
        return self

    def transform(self, X, y=None):
        X_copy = X.copy()

        X_copy["engagement_efficiency"] = X_copy["engagement_score"] / (X_copy["support_tickets_last_30d"] + 1)
        X_copy["establishment_level"] = X_copy["customer_age_months"] / (X_copy["customer_age_months"] + X_copy["contract_length_months"])

        X_copy["overall_risk_score"] = (
            (1 - X_copy["engagement_score"]) * 0.25 + 
            (1 - (X_copy["nps_score"] / 10)) * 0.25 +
            (X_copy["support_tickets_last_30d"]) * 0.25 +
            (X_copy["payment_failures"] / 10) * 0.25
        )

        X_copy["team_integration_level"] = X_copy["product_adoption_rate"] + X_copy["active_users_ratio"] / 2
        X_copy['churnRisk_per_payment_failure'] = X_copy['churn_risk_flag'] * (X_copy['payment_failures'] / 10)

        return X_copy

if __name__ == "__main__":
    churn_transformer = ChurnFeatureEngineering()

    df = pd.read_csv(r"C:\stratiq\data\churn_dataset.csv")
    print(df)

    transformed_churn = churn_transformer.fit_transform(df)
    print(transformed_churn)