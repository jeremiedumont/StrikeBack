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
    @State var isActiveLogin : Bool = false
    @State var showView : Bool  = false
    @State var isActiveSignup : Bool = false
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
                    NavigationLink(destination: NotificationsView()) {
                        Image(systemName: "envelope")
                            .foregroundColor(.gray)
                            .imageScale(.large)
                        Text("Notifications")
                            .foregroundColor(.gray)
                            .font(.headline)
                    }
                    
                }.padding(.top, 30)
                
                
                    Button(action : {
                        let defaults = UserDefaults.standard
                        defaults.removeObject(forKey: "pseudo")
                        defaults.removeObject(forKey: "password")
                        
                        (UIApplication.shared.delegate as! AppDelegate).currentUser = nil
                        self.showMenu.toggle()
                    }){
                        Image(systemName: "trash")
                            .foregroundColor(.gray)
                            .imageScale(.large)
                        Text("Logout")
                            .foregroundColor(.gray)
                            .font(.headline)
                    }.padding(.top, 30)
                    
                    
                
            }
            else{
                Spacer()
            
            HStack {
                Button(action : {
                    self.isActiveLogin.toggle()
                }){
                    Image(systemName: "person")
                   .foregroundColor(.gray)
                   .imageScale(.large)
                   Text("Se connecter")
                   .foregroundColor(.gray)
                   .font(.headline)
                }.sheet(isPresented : self.$isActiveLogin){
                    LoginView(isActiveLogin: self.$isActiveLogin, showMenu: self.$showMenu)
                }
               
            }
            .padding(.top, 30)
            HStack {
                Button(action : {
                    self.isActiveSignup.toggle()
                }){
                    Image(systemName: "person")
                        .foregroundColor(.gray)
                        .imageScale(.large)
                    Text("S'inscrire")
                        .foregroundColor(.gray)
                        .font(.headline)
                }.sheet(isPresented : self.$isActiveSignup){
                    SignupView(showMenu : self.$showMenu, isActiveLogin : self.$isActiveLogin, isActiveSignup : self.$isActiveSignup)
                    
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


