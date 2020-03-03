
//  File.swift
//  TestSwiftUI
//
//  Created by user164174 on 2/17/20.
//  Copyright © 2020 user164174. All rights reserved.
//

import Foundation

class Person : ObservableObject, Identifiable, Decodable{
    @Published var firstName : String
    @Published var lastName : String
    @Published var job : String
    @Published var department : String
   
    init(firstName : String, lastName : String, job : String, department : String){
        self.firstName = firstName
        self.lastName = lastName
        self.job = job
        self.department = department
    }
    
   
    
    private enum CodingKeys : String, CodingKey{
        case firstName = "firstName"
        case lastName = "lastName"
        case job = "job"
        case department = "department"
        
        
    }
    
    
    required init(from decoder : Decoder) throws{
        let container = try decoder.container(keyedBy: CodingKeys.self)
        self.firstName  = try container.decode(String.self, forKey: .firstName)
        self.lastName = try container.decode(String.self, forKey: .lastName)
        self.job = try container.decode(String.self, forKey: .job)
        self.department = try container.decode(String.self, forKey: .department)
    }
    
}
