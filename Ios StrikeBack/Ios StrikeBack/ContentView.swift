//
//  ContentView.swift
//  TestSwiftUI
//
//  Created by user164174 on 2/17/20.
//  Copyright © 2020 user164174. All rights reserved.
//
import SwiftUI

struct ContentView: View {
    
    @State var showMenu = false
    //@State var isConnected = false
    var body: some View {
        
        let drag = DragGesture()
            .onEnded {
                if $0.translation.width < -100 {
                    withAnimation {
                        self.showMenu = false
                    }
                }
            }
        
        return NavigationView {
            GeometryReader { geometry in
                ZStack(alignment: .leading) {
                    MainView()
                        .frame(width: geometry.size.width, height: geometry.size.height)
                        .disabled(self.showMenu ? true : false)
                    if self.showMenu {
                        MenuView(showMenu : self.$showMenu)
                            .frame(width: geometry.size.width/2)
                            .transition(.move(edge: .leading))
                    }
                }
                    .gesture(drag)
            }
                .navigationBarTitle("Accueil", displayMode: .inline)
                .navigationBarItems(leading: (
                    Button(action: {
                        withAnimation {
                            self.showMenu.toggle()
                        }
                    }) {
                        Image(systemName: "line.horizontal.3")
                            .imageScale(.large)
                    }
                ))
        }
    }
}

struct MainView: View {
    @State var isActive = false
    var mytab = RemarkSet(tab : RemarkDAO.getSortedRemarksByDate(order: 1, skip: 0, number: 10))
    
    
    var body: some View {
        NavigationView{
            VStack{
                
                Button(action : {
                    self.isActive.toggle()
                }){
                    Text("New")
                }.sheet(isPresented : self.$isActive){
                    CreateRemarkView(isActive : self.$isActive)
                }
                /*
                NavigationLink(destination : CreateView()){
                    Text("New")
                }.buttonStyle(PlainButtonStyle())
                  */
                
                
                
                List (mytab.tabRemark){ remark in
                    //NavigationLink(destination : DetailView(person: person)){
                    Text(remark.text)
                    //}
                }
                
                
            }
        }
    }
}


/*struct MainView: View {
    @State var isActive = false
    var mytab = RemarkSet(tab : RemarkDAO.getSortedRemarksByDate(order: 1, skip: 0, number: 10))
    @Binding var showMenu: Bool
    
    init(){
        
    }
    
    var body: some View {
        NavigationView{
            VStack{
                
                Button(action : {
                    self.isActive.toggle()
                }){
                    Text("New")
                }.sheet(isPresented : self.$isActive){
                    CreateRemarkView(isActive : self.$isActive)
                }
                /*
                NavigationLink(destination : CreateView()){
                    Text("New")
                }.buttonStyle(PlainButtonStyle())
                  */
                
                
                
                List (mytab.tabRemark){ remark in
                    //NavigationLink(destination : DetailView(person: person)){
                    Text(remark.text)
                    //}
                }
                
                
            }
        }
    }
}*/


