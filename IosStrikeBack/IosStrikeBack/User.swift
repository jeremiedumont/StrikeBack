//
//  User.swift
//  Ios StrikeBack
//
//  Created by user164174 on 3/1/20.
//  Copyright © 2020 user164174. All rights reserved.
//

import Foundation


//  File.swift
//  TestSwiftUI
//
//  Created by user164174 on 2/17/20.
//  Copyright © 2020 user164174. All rights reserved.
//

import Foundation
//pseudo, color, email, password, admin, creationDate
class User : ObservableObject, Identifiable, Decodable{
    @Published var pseudo : String
    @Published var color : String
    @Published var email : String
    @Published var userId : String
    
    var creationDate: Date
    var authToken : String?
    
    init(pseudo : String, color : String, email : String, creationDate : Date, userId : String){
        self.pseudo = pseudo
        self.color = color
        self.email = email
        self.creationDate = creationDate
        self.userId = userId
    }
    
    
    
    private enum CodingKeys : String, CodingKey{
        case pseudo = "pseudo"
        case color = "color"
        case email = "email"
        case creationDate = "creationDate"
        case userId = "_id"
        case authToken = "authToken"
    }
    
    
    required init(from decoder : Decoder) throws{
        let container = try decoder.container(keyedBy: CodingKeys.self)
        self.pseudo  = try container.decode(String.self, forKey: .pseudo)
        self.color = try container.decode(String.self, forKey: .color)
        self.email = try container.decode(String.self, forKey: .email)
        let isodate = try container.decode(String.self, forKey: .creationDate)
        self.userId = try container.decode(String.self, forKey: .userId)
        do{
            if(try container.decode(String?.self, forKey: .authToken) != nil){
                self.authToken = try container.decode((String?).self, forKey: .authToken)
            }
        }catch let err{
            
        }
        
        let dateF = DateFormatter()
        dateF.dateFormat = "yyyy-MM-dd'T'HH:mm:ss"
        
        self.creationDate = dateF.date(from: isodate.components(separatedBy: ".")[0])!
    }
    
}
