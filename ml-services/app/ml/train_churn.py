import os
import joblib
import numpy as np
import pandas as pd
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score,recall_score,f1_score,precision_score,roc_auc_score
from sklearn.pipeline import Pipeline
from sklearn.model_selection import train_test_split
class ChurnTrainer:
    def __init__(self):
        pass

    def load_data(self):
        self.df = pd.read_csv("C:/STRAT_IQ/data/updated_churn_data.xls")
        return self.df

    def FeatureSelection(self):
        self.X = self.df.drop("churn", axis=1)
        self.y = self.df["churn"]
        print(f"Shape of X - {self.X.shape}")
        print(f"Shape of y - {self.y.shape}")

        return self.X, self.y

    def TrainTestSplit(self):
        self.X_train, self.X_test, self.y_train, self.y_test = train_test_split(self.X, self.y, test_size=0.2, random_state=42, stratify = self.y)
        print(f"Shape of X_train - {self.X_train.shape}")
        print(f"Shape of X_test - {self.X_test.shape}")

        print(f"Shape of y_train - {self.y_train.shape}")
        print(f"Shape of y_test - {self.y_test.shape}")

        print("Splitting Process successful !")
        return self.X_train,self.X_test,self.y_train,self.y_test
  
    def build_pipeline(self):
        self.pipeline = Pipeline([
            ("classifier", RandomForestClassifier(
                n_estimators=150,
                max_depth=15,
                min_samples_split=4,
                min_samples_leaf=2,
                random_state=42,
                n_jobs=1,
                class_weight="balanced"
            ))
        ])

        self.pipeline.fit(self.X_train, self.y_train)
        print("Pipeline Setup successful !")

        return self.pipeline
    
    def evaluation(self): 
        self.y_pred = self.pipeline.predict(self.X_test)

        self.accuracy = accuracy_score(self.y_test, self.y_pred)
        self.precision = precision_score(self.y_test, self.y_pred)
        self.recall = recall_score(self.y_test, self.y_pred)
        self.f1 = f1_score(self.y_test, self.y_pred)
        self.roc_auc = roc_auc_score(self.y_test, self.y_pred)

        print(f"The Accuracy Score - {self.accuracy * 100}%")
        print(f"The Precision Score - {self.precision * 100}%")
        print(f"The Recall Score - {self.recall * 100}%")
        print(f"F1 Score - {self.f1 * 100}%")
        print(f"ROC_AUC_Score - {self.roc_auc * 100}%") 
    
    def churn_model(self):
        os.makedirs("models", exist_ok=True)
        joblib.dump(self.pipeline, "models/Churn_Classifier.pkl")
        print("Model Trained and Created Successfully")

if __name__ == "__main__":
    churn_classifier = ChurnTrainer()

    churn_classifier.load_data()
    churn_classifier.FeatureSelection()
    churn_classifier.TrainTestSplit()
    churn_classifier.build_pipeline()
    churn_classifier.evaluation()
    churn_classifier.churn_model()

