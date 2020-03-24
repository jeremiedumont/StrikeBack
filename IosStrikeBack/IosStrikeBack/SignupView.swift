//
//  SignupView.swift
//  Ios StrikeBack
//
//  Created by user164174 on 3/1/20.
//  Copyright © 2020 user164174. All rights reserved.
//

import SwiftUI

struct SignupView: View {
    
    @Binding var showMenu : Bool
    @Binding var isActiveLogin : Bool
    @Binding var isActiveSignup : Bool
    @State var pseudo : String = ""
    @State var email : String = ""
    @State var password :String = ""
    @State var password_conf :String = ""
    
    var color : String = "none"
    var creationDate: Date = Date()

    
    
    var body: some View {
   
                VStack() {
                   
                    VStack(alignment: .center, spacing: 15) {
        
                        TextField("Username", text: self.$pseudo)
                            .padding()
                            .background(Color.themeTextField)
                            .cornerRadius(20.0)
                            .shadow(radius: 10.0, x: 20, y: 10)
                        
                        TextField("Email", text: self.$email)
                        .padding()
                        .background(Color.themeTextField)
                        .cornerRadius(20.0)
                        .shadow(radius: 10.0, x: 20, y: 10)
                        
                        SecureField("Password", text: self.$password)
                        .padding()
                        .background(Color.themeTextField)
                        .cornerRadius(20.0)
                        .shadow(radius: 10.0, x: 20, y: 10)
                        
                        SecureField("ConfirmPassword", text: self.$password_conf)
                            .padding()
                            .background(Color.themeTextField)
                            .cornerRadius(20.0)
                            .shadow(radius: 10.0, x: 20, y: 10)
                    }.padding([.leading, .trailing], 27.5)
                    
        
                    Button(action: {
                        if(self.password == self.password_conf && self.password.count >= 6 && !(self.password.contains(" "))){
                            let isSignUp: Bool = UserDAO.signup(pseudo: self.pseudo, password: self.password, email: self.email, color: self.color)
                            if isSignUp {
                                print("Account has been signed up.")
                                
                                self.isActiveSignup = false
                                self.isActiveLogin = true
                                
                            } else {
                                print("Not signed up.")
                            }
                        } else {
                            print("Passwords don't match")
                        }
                    }) {
                        Text("Sign Up")
                            .font(.headline)
                            .foregroundColor(.white)
                            .padding()
                            .frame(width: 300, height: 50)
                            .background(Color.green)
                            .cornerRadius(15.0)
                            .shadow(radius: 10.0, x: 20, y: 10)
                    }.padding(.top, 50)
                
                }
                .frame(minWidth: 0, maxWidth: .infinity, minHeight: 0, maxHeight: .infinity, alignment: Alignment.center)
                .background(
                    LinearGradient(gradient: Gradient(colors: [.blue, .white]), startPoint: .top, endPoint: .bottom)
                        .edgesIgnoringSafeArea(.all))
               
            }
            

        
}


