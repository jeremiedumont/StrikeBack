//
//  SignupView.swift
//  Ios StrikeBack
//
//  Created by user164174 on 3/1/20.
//  Copyright © 2020 user164174. All rights reserved.
//

import SwiftUI

struct SignupView: View {
    
    /*@ObservedObject private var user : User = User(pseudo: "", color: "#000000", email: "", creationDate: Date())
    @Binding var confirm : String = "" */
    @State var pseudo : String
    @State var email : String
    @State var password :String
    var color : String = "#000000"
    var creationDate: Date = Date()

    var body: some View {
   
                VStack() {
                   
                    VStack(alignment: .center, spacing: 15) {
                        TextField("Username", text: self.$email)
                            .padding()
                            .background(Color.themeTextField)
                            .cornerRadius(20.0)
                            .shadow(radius: 10.0, x: 20, y: 10)
                        
                        TextField("Email", text: self.$email)
                        .padding()
                        .background(Color.themeTextField)
                        .cornerRadius(20.0)
                        .shadow(radius: 10.0, x: 20, y: 10)
                        
                        SecureField("Password", text: self.$email)
                        .padding()
                        .background(Color.themeTextField)
                        .cornerRadius(20.0)
                        .shadow(radius: 10.0, x: 20, y: 10)
                        
                        SecureField("ConfirmPassword", text: self.$password)
                            .padding()
                            .background(Color.themeTextField)
                            .cornerRadius(20.0)
                            .shadow(radius: 10.0, x: 20, y: 10)
                    }.padding([.leading, .trailing], 27.5)
                    
                    Button(action: {}) {
                        Text("Sign In")
                            .font(.headline)
                            .foregroundColor(.white)
                            .padding()
                            .frame(width: 300, height: 50)
                            .background(Color.green)
                            .cornerRadius(15.0)
                            .shadow(radius: 10.0, x: 20, y: 10)
                    }.padding(.top, 50)
                    
                    HStack(spacing: 0) {
                        Text("Don't have an account? ")
                        Button(action: {}) {
                            Text("Sign Up")
                                .foregroundColor(.black)
                        }
                    }.padding()
                    
                }
                .background(
                    LinearGradient(gradient: Gradient(colors: [.purple, .blue]), startPoint: .top, endPoint: .bottom)
                        .edgesIgnoringSafeArea(.all))
               
            }
            

        
}


