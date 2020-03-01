//
//  PersonSet.swift
//  TestSwiftUI
//
//  Created by user164174 on 2/17/20.
//  Copyright © 2020 user164174. All rights reserved.
//

import Foundation

class PersonSet : ObservableObject{
    @Published var tabPerson : [Person]
    init(tab : [Person]){
        self.tabPerson = tab
    }
    
    func add(person : Person){
        tabPerson.append(person)
        print(tabPerson[tabPerson.count-1].lastName)
    }
    
    
}

//Json
 

/*
let data : person.json
let json = try? JSONSerialization.jsonObject(with: data, options: [])*/

//manuel
var personset = PersonSet(tab : JsonManager.getPersons(path : "person"))
