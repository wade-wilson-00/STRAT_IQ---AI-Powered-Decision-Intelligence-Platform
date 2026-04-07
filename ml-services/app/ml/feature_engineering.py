import numpy as np 
import pandas as pd 
from sklearn.base import BaseEstimator, TransformerMixin

class FeatureEngineering(BaseEstimator, TransformerMixin):

    def fit(self, X, y=None):
        return self

    def transform(self, X, y=None):
        X_copy = X.copy()

        #MRR Lag Features
        X_copy["mrr_lag1"] = X_copy["mrr"].shift(1).fillna(X_copy["mrr"])
        X_copy["mrr_lag2"] = X_copy["mrr"].shift(2).fillna(X_copy["mrr"])
        X_copy["mrr_lag3"] = X_copy["mrr"].shift(3).fillna(X_copy["mrr"])

        #Derived Features
        X_copy["revenue_growth"] = X_copy["mrr"].pct_change().fillna(0)
        X_copy["burn_ratio"] = X_copy["burn_rate"] / X_copy["mrr"]
        X_copy["net_growth"] = X_copy["active_users"].diff().fillna(0)

        X_copy = X_copy.replace([np.inf, -np.inf], np.nan)
        X_copy = X_copy.fillna(0)
        X_copy = X_copy.reset_index(drop=True)

        return X_copy

if __name__ == "__main__":
    transformer = FeatureEngineering()

    df = pd.read_csv(r"c:\stratiq\data\startup_metrics (1).xls")
    print(df)

    transformed_df = transformer.fit_transform(df)
    print(transformed_df)