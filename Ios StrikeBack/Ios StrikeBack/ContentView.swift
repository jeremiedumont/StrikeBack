//
//  ContentView.swift
//  TestSwiftUI
//
//  Created by user164174 on 2/17/20.
//  Copyright © 2020 user164174. All rights reserved.
//

import SwiftUI

struct ContentView: View {
    @State var isActive = false
    var mytab = RemarkSet(tab : RemarkDAO.getSortedRemarksByDate(order: 1, skip: 0, number: 10))
    
    
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
}

struct ContentView_Previews: PreviewProvider {
    static var previews: some View {
        ContentView()
    }
}

