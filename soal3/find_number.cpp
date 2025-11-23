#include <iostream>
#include <string>
using namespace std;

void sortNumber(int Num[], int x) {
    for (int i = 0; i<x-1; i++){
        for (int j = i+1; j<x; j++){
            if (Num[i] > Num[j]){
                int temp = Num[i];
                Num[i] = Num[j];
                Num[j] = temp;
            }
        }
    }
}

void number(string input) {
    int Num[100];
    int length = input.length();
    string tempString;
    int tempNum;
    int x = 0;

    for (int i = 0; i < length; i++) {
        if (input[i] <= '9' && input[i] >= '0') {
            tempString += input[i];
        }if (input [i] == ',' && tempString != "") {
            tempNum = stoi(tempString);
            Num[x] = tempNum;
            tempString = "";
            cout << "Found number: " << Num[x] << endl;
            x++;
        }
    }

    if(tempString != "") {
        tempNum = stoi(tempString);
        Num[x] = tempNum;
        cout << "Found number: " << Num[x] << endl;
    }

    sortNumber(Num, x);

    cout << "Number: ";
    for (int i = 0; i < x+1; i++) {
        cout << Num[i] << ",";
    }
    cout << endl;

    for (int i = 0; i < x; i++) {
        if (Num[i] + 1 != Num[i + 1]) {
            for (int j = Num[i] + 1; j < Num[i + 1]; j++) {
                cout << "Missing number: " << j << endl;
            }
        }
    }
}

int main() {
    cout << "Enter an integer: ";
    string input;
    // Misal: 3106, 3102, 3104, 3105, 3107
    cin >> input;


    number(input);
}