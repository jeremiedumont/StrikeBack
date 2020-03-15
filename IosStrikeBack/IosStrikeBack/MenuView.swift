//
//  MenuView.swift
//  Ios StrikeBack
//
//  Created by user164174 on 3/1/20.
//  Copyright © 2020 user164174. All rights reserved.
//



import SwiftUI

struct MenuView: View {
    @Binding var showMenu : Bool
    @State var showView : Bool  = false
    var body: some View {
        
        VStack() {
            if( (UIApplication.shared.delegate as! AppDelegate).currentUser != nil){
                HStack {
                    NavigationLink(destination: MyProfilView()) {
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
                    NavigationLink(destination: MyActivities()) {
                        Image(systemName: "envelope")
                            .foregroundColor(.gray)
                            .imageScale(.large)
                        Text("My Activities")
                            .foregroundColor(.gray)
                            .font(.headline)
                    }
                    
                }.padding(.top, 30)
                
                HStack {
                    NavigationLink(destination: ContentView()) {
                        Image(systemName: "trash")
                            .foregroundColor(.gray)
                            .imageScale(.large)
                        Text("Logout")
                            .foregroundColor(.gray)
                            .font(.headline)
                    }
                    
                }.simultaneousGesture(TapGesture().onEnded{
                    let defaults = UserDefaults.standard
                    defaults.removeObject(forKey: "pseudo")
                    defaults.removeObject(forKey: "password")
                    (UIApplication.shared.delegate as! AppDelegate).currentUser = nil
                }).padding(.top, 30)
            }
            else{
                Spacer()
            
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
                NavigationLink(destination: SignupView(pseudo : "",email:"",password :"",password_conf : "",showMenu : self.$showMenu, color : "#000000", creationDate: Date())) {
                    Image(systemName: "person")
                        .foregroundColor(.gray)
                        .imageScale(.large)
                    Text("S'inscrire")
                        .foregroundColor(.gray)
                        .font(.headline)
                }
                
            }.simultaneousGesture(TapGesture().onEnded{
                self.showView.toggle()
                
            })
            .padding(.top, 30)
            }
            Spacer()
            }
            .padding()
            .frame(maxWidth: .infinity, alignment: .leading)
            .background(Color(red: 32/255, green: 32/255, blue: 32/255))
            .edgesIgnoringSafeArea(.all)
    }
        
}


