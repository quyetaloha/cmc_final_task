/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package org.cmc.nlms.dao;

import org.cmc.nlms.model.Slider;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 *
 * @author MyPC
 */
@Repository
public interface SliderRepository extends JpaRepository<Slider,Integer> {
    
}
