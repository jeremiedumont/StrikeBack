//
//  ContentView.swift
//  TestSwiftUI
//
//  Created by user164174 on 2/17/20.
//  Copyright © 2020 user164174. All rights reserved.
//
import SwiftUI
struct ContentView: View {
    //var currentUser : User? = (UIApplication.shared.delegate as! AppDelegate).currentUser
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
                    MainView(reloadRemarks: !self.showMenu)
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
    var currentUser : CurrentUser? = (UIApplication.shared.delegate as! AppDelegate).currentUser
    @State var isActive = false
    @State var spin = true
    @State var pageNumber = 0
    @State var type = "Date"
    @State var order = 1
    @State var number = 10
    @State var render = 1
    @State var numberRemTot = RemarkDAO.getRemarksCount()
    @ObservedObject var mytab : RemarkSet
    @State var research = ""
    
    init(reloadRemarks : Bool){
        if(reloadRemarks){
            mytab = RemarkSet(tab : RemarkDAO.getSortedRemarksByDate(order: 1, skip: 0, number: 10))
            (UIApplication.shared.delegate as! AppDelegate).tabRemarks = mytab.tabRemark
        }
        else{
            mytab = RemarkSet(tab : (UIApplication.shared.delegate as! AppDelegate).tabRemarks)
        }
    }
    
    func getRemarks(){
       
            if(self.type == "Date"){
                self.mytab.tabRemark = RemarkDAO.getSortedRemarksByDate(order: self.order, skip: self.pageNumber*self.number, number: self.number)
            }else{
                self.mytab.tabRemark = RemarkDAO.getSortedRemarksByHeard(order: self.order, skip: self.pageNumber*self.number, number: self.number)
            }
        
    }
    
    var body: some View {
        //NavigationView(alignment: .leading){
            VStack{
                /*Image(systemName: "arrow.2.circlepath.circle.fill")
                    .resizable()
                    .frame(width : 128, height: 128)
                    .rotationEffect(.degrees(spin ? 360: 0))
                    .animation(.easeInOut)
                    //.animation(.basic(duration: 0.8, curve: .linear).repeatForever(autoreverses: false))*/
                HStack{
                     Spacer()
                    Text("Date ")
                    VStack{
                        Button(action : {
                            self.order = 1
                            self.type = "Date"
                            self.getRemarks()
                        }){
                            Image(systemName: "chevron.up")
                        }
                        Button(action : {
                            self.order = -1
                            self.type = "Date"
                            self.getRemarks()
                        }){
                            Image(systemName: "chevron.down")
                        }
                        
                    }
                    Spacer()
                    Text("Pertinency ")
                    VStack{
                        Button(action : {
                            self.order = 1
                            self.type = "Heard"
                            self.getRemarks()
                        }){
                            Image(systemName: "chevron.up")
                        }
                        Button(action : {
                            self.order = -1
                            self.type = "Heard"
                            self.getRemarks()
                        }){
                            Image(systemName: "chevron.down")
                        }
                        
                    }
                     Spacer()
                }.padding()
                    //.background(Color.purple)
                    .background(Color(red: 0, green : 245/255, blue : 245/255).opacity(0.1))
                    //.background(Color(red: 209/255, green : 56/255, blue : 102/255).opacity(0.8))
                    //.shadow(color : Color.purple.opacity(0.4), radius: 5, x: 0, y: 10)
               ScrollView{
                VStack{
                    HStack{
                    Spacer()
                                   if (pageNumber > 0){
                                       Button(action : {
                                           self.pageNumber -= 1
                                           self.getRemarks()
                                       }){
                                           Image(systemName: "chevron.left")
                                       }
                                   }
                                   
                                   Text("Page " + String(pageNumber+1) + "/" + String(Int(ceil(Double(numberRemTot)/Double(number)))))
                                   
                                   if((pageNumber+1)*number < numberRemTot){
                                       Button(action : {
                                           self.pageNumber += 1
                                           self.getRemarks()
                                       }){
                                           Image(systemName: "chevron.right")
                                       }
                                   }
                                   Spacer()
                    if( currentUser != nil){
                        Button(action : {
                            self.isActive.toggle()
                        }){
                         Image(systemName: "plus.circle.fill")                                        .resizable()
                             .frame(width: 40, height: 40)

                         
                        }.sheet(isPresented : self.$isActive){
                            CreateRemarkView(isActive : self.$isActive, mytab : self.mytab)
                        }
                     
                    }
                                   
                               }
                    HStack{
                        Spacer()
                        TextField("Research", text: self.$research)
                        .padding()
                        .background(Color.themeTextField)
                        .cornerRadius(20.0)
                        Button(action:{
                            print(self.research)
                                self.mytab.tabRemark = RemarkDAO.getResearch(research: self.research)
                            
                        }){
                            Text("Search")
                        }.padding()
                    }
                }
                   VStack(spacing: 20){
                    
                                   
                    
                       ForEach(mytab.tabRemark){ remark in
                        HStack{
                               NavigationLink(destination : RemarkDetailsView(remark: remark)){
                                  
                                   RemarkView(remark : remark, canheard: true)
                               
                               }
                            HStack{
                                VStack{
                                    if(self.currentUser != nil){
                                        Button(action : {
                                            RemarkDAO.addHeard(remarkId: remark.postId)
                                            self.currentUser?.heards?.append(remark.postId)
                                            self.number += 1
                                            self.number -= 1
                                            remark.heard += 1
                                        }){
                                            Image(systemName: "chevron.up")
                                        }.disabled(((self.currentUser?.heards?.contains(remark.postId))!))
                                    }
                                        Text(String(remark.heard))
                                    
                                }
                                if(self.currentUser != nil){
                                    VStack{
                                        Button(action : {
                                            if(ReportDAO.addReport(postId: remark.postId, type: "Remark")){
                                                self.currentUser?.reports?.append(remark.postId)
                                                self.number += 1
                                                self.number -= 1
                                                
                                            }else{
                                                print("Return false fuck")
                                            }
                                        }){
                                        Image(systemName: "exclamationmark.triangle")
                                            }//.foregroundColor(Color(UIColor(named: "RedColor")!))
                                            .disabled(((self.currentUser?.reports?.contains(remark.postId))!))
                                            .foregroundColor(Color.red)
                                        
                                    }
                                }
                            }
                        }
                       }
                   }.padding()
               }
              
                
        }
        //}
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


