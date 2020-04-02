//
//  LoginView.swift
//  Ios StrikeBack
//
//  Created by user164174 on 3/1/20.
//  Copyright © 2020 user164174. All rights reserved.
//

import SwiftUI


struct LoginView: View {
    
    @State private var pseudo = ""
    @State private var password = ""
    @Binding var isActiveLogin : Bool
    @Binding var showMenu : Bool
    
    var body: some View {
        VStack() {
            
            Spacer()
            VStack(alignment: .center, spacing: 15) {
                TextField("Username", text: self.$pseudo)
                    .padding()
                    .background(Color.themeTextField)
                    .cornerRadius(20.0)
                    .shadow(radius: 10.0, x: 20, y: 10)
                
                SecureField("Password", text: self.$password)
                    .padding()
                    .background(Color.themeTextField)
                    .cornerRadius(20.0)
                    .shadow(radius: 10.0, x: 20, y: 10)
            }.padding([.leading, .trailing], 27.5)
            
            Button(action: {
                if(!(UserDAO.login(pseudo: self.pseudo, password: self.password, autologin: false))){
                    print("Error ! Login impossible")
                }else{
                    print("You are logged in")
                    self.isActiveLogin = false
                    self.showMenu = false
                }
            }) {
                Text("Login")
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
            Spacer()
        }
        .background(
            LinearGradient(gradient: Gradient(colors: [.blue, .white]), startPoint: .top, endPoint: .bottom)
                .edgesIgnoringSafeArea(.all))
        
    }
}

extension Color {
    static var themeTextField: Color {
        return Color(red: 220.0/255.0, green: 230.0/255.0, blue: 230.0/255.0, opacity: 1.0)
    }}



