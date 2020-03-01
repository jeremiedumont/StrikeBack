//
//  MenuView.swift
//  Ios StrikeBack
//
//  Created by user164174 on 3/1/20.
//  Copyright © 2020 user164174. All rights reserved.
//



import SwiftUI

struct MenuView: View {
    var body: some View {
        
        VStack() {
            HStack {
                
                NavigationLink(destination: MyRemarks()) {
                    Image(systemName: "person")
                        .foregroundColor(.gray)
                        .imageScale(.large)
                    
                    Text("Profile")
                        .foregroundColor(.gray)
                        .font(.headline)
                }
                
            
                
            }
            .padding(.top, 100)
            HStack {
                NavigationLink(destination: MyRemarks()) {
                    Image(systemName: "envelope")
                        .foregroundColor(.gray)
                        .imageScale(.large)
                    Text("Mes Remarques")
                        .foregroundColor(.gray)
                        .font(.headline)
                }
                
            }
                .padding(.top, 30)
            HStack {
                NavigationLink(destination: MyRemarks()) {
                    Image(systemName: "envelope")
                        .foregroundColor(.gray)
                        .imageScale(.large)
                    Text("Mes Réponses")
                        .foregroundColor(.gray)
                        .font(.headline)
                }
                
            }
                .padding(.top, 30)
            
            HStack {
                NavigationLink(destination: LoginView()) {
                    Image(systemName: "person")
                        .foregroundColor(.gray)
                        .imageScale(.large)
                    Text("Se connecter")
                        .foregroundColor(.gray)
                        .font(.headline)
                }
                
            }
            .padding(.top, 30)
            HStack {
                NavigationLink(destination: SignupView(pseudo : "",email:"",password :"",color : "#000000", creationDate : Date())) {
                    Image(systemName: "person")
                        .foregroundColor(.gray)
                        .imageScale(.large)
                    Text("S'inscrire")
                        .foregroundColor(.gray)
                        .font(.headline)
                }
                
            }
            .padding(.top, 30)
            Spacer()
        }
            .padding()
            .frame(maxWidth: .infinity, alignment: .leading)
            .background(Color(red: 32/255, green: 32/255, blue: 32/255))
            .edgesIgnoringSafeArea(.all)
    }
        
}

struct MenuView_Previews: PreviewProvider {
    static var previews: some View {
        MenuView()
    }
}
