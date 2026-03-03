import joblib
import os
import numpy as np
import pandas as pd
from feature_engineering import FeatureEngineering
from sklearn.pipeline import Pipeline
from sklearn.linear_model import LinearRegression 
from sklearn.metrics import mean_absolute_error, mean_squared_error

class RevenueForecaster:
    def __init__(self):
        pass

    def load_data(self):
        self.df = pd.read_csv(r"c:\STRAT_IQ\data\startup_metrics (1).csv")
        self.df = self.df.sort_values(by="month", ascending=True).reset_index(drop=True)
        self.df = self.df.drop(columns="month")
        return self.df

    def create_target(self):

        y_target = self.df["mrr"].shift(-1)
        X = self.df.copy()

        X = X.iloc[:-1].reset_index(drop=True)
        y_target = y_target.iloc[:-1].reset_index(drop=True)

        mask = ~(X.isna().any(axis=1) | y_target.isna())

        self.X = X[mask].reset_index(drop=True)
        self.y_target = y_target[mask].reset_index(drop=True)
        
        print(f"Target Shape of Y - {self.y_target.shape}")
        print(f"Shape of X - {self.X.shape}")

        return self.X, self.y_target
    
    def train_test_split(self):
        self.training_size = int(len(self.df) * 0.8)

        self.X_train = self.X.iloc[:self.training_size]
        self.X_test = self.X.iloc[self.training_size:]

        self.y_train = self.y_target.iloc[:self.training_size]
        self.y_test = self.y_target.iloc[self.training_size:]

        return self.X_train,self.X_test,self.y_train,self.y_test
    
    def pipeline(self):
        self.pipeline = Pipeline([
            ("feature_engineering", FeatureEngineering()),
            ("linear_regression", LinearRegression())
        ])
        
        self.pipeline.fit(self.X_train, self.y_train)
        self.predict = self.pipeline.predict(self.X_test)
        print("Model Trained Successfully")

        return self.predict
    
    def evaluation(self):
        self.mae = mean_absolute_error(self.predict, self.y_test)
        self.rmse = np.sqrt(mean_squared_error(self.predict, self.y_test))
        
        print(f"The Mean Absolute Error - ${self.mae}")
        print(f"The Mean Squared Error - ${self.rmse}")

    def save_model(self):

        joblib.dump(self.pipeline, "models/revenue_model_v1.pkl")
        print("Model saved successfully to models/revenue_model_v1.pkl")
    

if __name__ == "__main__":
    forecaster = RevenueForecaster()
    forecaster.load_data()
    forecaster.create_target()
    forecaster.train_test_split()
    forecaster.pipeline()
    forecaster.evaluation()
    forecaster.save_model()

    print("\n✓✓✓ Training Pipeline Complete! ✓✓✓")

        


        

        

