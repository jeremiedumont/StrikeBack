//
//  Notification.swift
//  IosStrikeBack
//
//  Created by user164174 on 3/14/20.
//  Copyright © 2020 user164174. All rights reserved.
//

import Foundation


class Notification : ObservableObject, Identifiable, Codable{
    @Published var userId : String
    @Published var postId : String
    @Published var numberNotifs : Int
    @Published var notifId : String
   
    init(postId : String, userId : String, numberNotifs : Int, notifId : String){
        self.postId = postId
        self.userId = userId
        self.numberNotifs = numberNotifs
        self.notifId = notifId
    }
    
 
   
    
    private enum CodingKeys : String, CodingKey{
        case userId = "userId"
        case postId = "postId"
        case numberNotifs = "numberNotifs"
        case notifId = "_id"
    }
    
    
    required init(from decoder : Decoder) throws{
        let container = try decoder.container(keyedBy: CodingKeys.self)
        self.userId  = try container.decode(String.self, forKey: .userId)
        self.postId  = try container.decode(String.self, forKey: .postId)
        self.numberNotifs = try container.decode(Int.self, forKey: .numberNotifs)
        self.notifId = try container.decode(String.self, forKey: .notifId)
    }
    
    func encode(to encoder: Encoder) throws {
        var container = encoder.container(keyedBy: CodingKeys.self)
        try container.encode(userId, forKey: .userId)
        try container.encode(notifId, forKey: .notifId)
        try container.encode(numberNotifs, forKey: .numberNotifs)
        try container.encode(postId, forKey: .postId)
    }
    
}
