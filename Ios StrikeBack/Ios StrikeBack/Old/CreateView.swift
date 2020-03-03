//
//  CreateView.swift
//  TestSwiftUI
//
//  Created by user164174 on 2/17/20.
//  Copyright © 2020 user164174. All rights reserved.
//

import Foundation
import SwiftUI

struct CreateView : View{
    @ObservedObject private var person : Person = Person(firstName: "", lastName: "", job: "", department: "")
//    @State var firstname : String;
    @Binding var isActive : Bool
    //@Environment(\.presentationMode) var presentation
  
    
    var body: some View {
        NavigationView{
            Form{
                Section(header: Text("FirstName")){
                    TextField("FirstName", text: $person.firstName)
                }
                Section(header: Text("LastName")){
                    TextField("LastName", text: $person.lastName)
                }
                Section(header: Text("Job")){
                    TextField("Job", text: $person.job)
                }
                Section(header: Text("Department")){
                    TextField("Department", text: $person.department)
                }
                Section{
                    Button(action:{
                        personset.add(person: self.person)
                        self.isActive = false
                        //self.presentation.wrappedValue.dismiss()
                    }){
                        Text("Submit")
                    }
                }
            }
            
        }
    }
}
