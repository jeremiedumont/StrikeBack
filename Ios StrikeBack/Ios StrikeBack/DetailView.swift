//
//  DetailView.swift
//  TestSwiftUI
//
//  Created by user164174 on 2/17/20.
//  Copyright © 2020 user164174. All rights reserved.
//

import Foundation
import SwiftUI

struct DetailView : View{
    var person : Person!
    
    init(person : Person){
        self.person = person
    }
    
    var body: some View {
            VStack{
                Text("Last Name : \(person.lastName)")
                Text("First Name : \(person.firstName)")
                Text("Job : \(person.job)")
                Text("Department : \(person.department)")
            }
        }
    
}
    /*struct DetailView_Previews: PreviewProvider {
        static var previews: some View {
            DetailView()
        }
    }*/

    
    

