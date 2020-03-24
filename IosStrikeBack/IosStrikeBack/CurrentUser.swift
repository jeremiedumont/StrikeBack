//
//  CurrentUser.swift
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
class CurrentUser : User{

    var password: String?
    var ups : [String]?
    var downs : [String]?
    @Published var reports : [String]?
    var heards : [String]?
    
    override init(pseudo : String, color : String, email : String, creationDate : Date, userId : String){
        super.init(pseudo : pseudo, color : color, email : email, creationDate : creationDate, userId : userId)
    }
    
   
    
    private enum CodingKeys : String, CodingKey{
       case pseudo = "pseudo"
       case color = "color"
       case email = "email"
       case creationDate = "creationDate"
       case userId = "_id"
       case authToken = "authToken"
       case password = "password"
       case ups = "ups"
       case downs = "downs"
       case reports = "reports"
       case heards = "heards"
    }
    
    
    required init(from decoder : Decoder) throws{
        try super.init(from: decoder)
        
        let container = try decoder.container(keyedBy: CodingKeys.self)
        self.password = try container.decode(String.self, forKey: .password)
        self.ups = try container.decode([String].self, forKey: .ups)
        self.downs = try container.decode([String].self, forKey: .downs)
        self.reports = try container.decode([String].self, forKey: .reports)
        self.heards = try container.decode([String].self, forKey: .heards)
  }
    
}
