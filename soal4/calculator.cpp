#include <iostream>
#include <string>
#include <vector>
#include <cmath>

using namespace std;

int TARGET;
bool found = false;

bool almostEqual(double a, double b) {
    return fabs(a - b) < 1e-6;
}

void solve(vector<double> nums, vector<string> exprs) {
    if (found) return;

    if (nums.size() == 1) {
        if (almostEqual(nums[0], TARGET)) {
            cout << "Found Expression: " << exprs[0] << endl;
            found = true;
        }
        return;
    }

    for (int i = 0; i < nums.size(); i++) {
        for (int j = i + 1; j < nums.size(); j++) {

            double a = nums[i];
            double b = nums[j];
            string ea = exprs[i];
            string eb = exprs[j];

            vector<double> nextNums;
            vector<string> nextExprs;

            for (int k = 0; k < nums.size(); k++) {
                if (k != i && k != j) {
                    nextNums.push_back(nums[k]);
                    nextExprs.push_back(exprs[k]);
                }
            }

            struct Op {
                double value;
                string expr;
            };

            vector<Op> ops;

            ops.push_back({a + b, "(" + ea + "+" + eb + ")"});
            ops.push_back({a - b, "(" + ea + "-" + eb + ")"});
            ops.push_back({b - a, "(" + eb + "-" + ea + ")"});
            ops.push_back({a * b, "(" + ea + "*" + eb + ")"});

            if (b != 0) ops.push_back({a / b, "(" + ea + "/" + eb + ")"});
            if (a != 0) ops.push_back({b / a, "(" + eb + "/" + ea + ")"});

            for (auto &op : ops) {
                nextNums.push_back(op.value);
                nextExprs.push_back(op.expr);

                solve(nextNums, nextExprs);

                nextNums.pop_back();
                nextExprs.pop_back();
            }
        }
    }
}

void targetOperation(int Num[]) {
    vector<double> nums;
    vector<string> exprs;

    int n = 0;
    while (Num[n] != 0 && n < 100) n++;

    for (int i = 0; i < n; i++) {
        nums.push_back(Num[i]);
        exprs.push_back(to_string(Num[i]));
    }

    solve(nums, exprs);

    if (!found) {
        cout << "No expression found to reach target." << endl;
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

    cout << "Number: ";
    for (int i = 0; i < x+1; i++) {
        cout << Num[i] << ",";
    }
    cout << endl;

    targetOperation(Num);
}



int main() {
    // input: 1,4,5,6
    // target: 18
    // output: (1+5)*4-6
    // target: 16
    // output: 1+4+5+6
    cout << "Enter an operation (+, -, *): ";
    string input;
    cin >> input;
    cout << "Target Result: ";
    int target;
    cin >> target;

    TARGET = target;

    number(input);
    
    return 0;
}