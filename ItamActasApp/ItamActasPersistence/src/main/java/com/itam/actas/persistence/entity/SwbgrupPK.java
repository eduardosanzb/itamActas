/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.itam.actas.persistence.entity;

import java.io.Serializable;
import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Embeddable;

/**
 *
 * @author JABS
 */
@Embeddable
public class SwbgrupPK implements Serializable {

    @Basic(optional = false)
    @Column(name = "SWBGRUP_TERM_CODE")
    private String swbgrupTermCode;
    @Basic(optional = false)
    @Column(name = "SWBGRUP_CRN")
    private String swbgrupCrn;

    public SwbgrupPK() {
    }

    public SwbgrupPK(String swbgrupTermCode, String swbgrupCrn) {
        this.swbgrupTermCode = swbgrupTermCode;
        this.swbgrupCrn = swbgrupCrn;
    }

    public String getSwbgrupTermCode() {
        return swbgrupTermCode;
    }

    public void setSwbgrupTermCode(String swbgrupTermCode) {
        this.swbgrupTermCode = swbgrupTermCode;
    }

    public String getSwbgrupCrn() {
        return swbgrupCrn;
    }

    public void setSwbgrupCrn(String swbgrupCrn) {
        this.swbgrupCrn = swbgrupCrn;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (swbgrupTermCode != null ? swbgrupTermCode.hashCode() : 0);
        hash += (swbgrupCrn != null ? swbgrupCrn.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof SwbgrupPK)) {
            return false;
        }
        SwbgrupPK other = (SwbgrupPK) object;
        if ((this.swbgrupTermCode == null && other.swbgrupTermCode != null) || (this.swbgrupTermCode != null && !this.swbgrupTermCode.equals(other.swbgrupTermCode))) {
            return false;
        }
        if ((this.swbgrupCrn == null && other.swbgrupCrn != null) || (this.swbgrupCrn != null && !this.swbgrupCrn.equals(other.swbgrupCrn))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.itam.actas.persistence.entity.SwbgrupPK[ swbgrupTermCode=" + swbgrupTermCode + ", swbgrupCrn=" + swbgrupCrn + " ]";
    }
    
}
