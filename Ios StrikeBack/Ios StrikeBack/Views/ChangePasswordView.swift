//
//  ChangePasswordView.swift
//  Ios StrikeBack
//
//  Created by user164174 on 3/11/20.
//  Copyright © 2020 user164174. All rights reserved.
//

import SwiftUI

struct ChangePasswordView: View {
    @State private var oldPassword = ""
    @State private var newPassword = ""
    @Binding var isActivePassword : Bool
    var currentUser : User? = (UIApplication.shared.delegate as! AppDelegate).currentUser
    var body: some View {
         VStack() {
                  
                   Spacer()
                   VStack(alignment: .center, spacing: 15) {
                       TextField("Old Password", text: self.$oldPassword)
                           .padding()
                           .background(Color.themeTextField)
                           .cornerRadius(20.0)
                           .shadow(radius: 10.0, x: 20, y: 10)
                       
                       SecureField("NewPassword", text: self.$newPassword)
                           .padding()
                           .background(Color.themeTextField)
                           .cornerRadius(20.0)
                           .shadow(radius: 10.0, x: 20, y: 10)
                   }.padding([.leading, .trailing], 27.5)
                   
                   Button(action: {
                    if(!(UserDAO.updatePassword(userId: self.currentUser!.userId, oldPassword: self.oldPassword, newPassword: self.newPassword))){
                           print("Error !")
                       }else{
                           print("Your Password as changed")
                            self.isActivePassword = false;
                       }
                   }) {
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
                   Spacer()
               }
               .background(
                   LinearGradient(gradient: Gradient(colors: [.purple, .blue]), startPoint: .top, endPoint: .bottom)
                       .edgesIgnoringSafeArea(.all))
               
           }
    }



