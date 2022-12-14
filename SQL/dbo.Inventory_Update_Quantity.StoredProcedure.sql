USE [MiVet]
GO
/****** Object:  StoredProcedure [dbo].[Inventory_Update_Quantity]    Script Date: 11/23/2022 3:33:09 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author: Gideon Macapagal
-- Create date: November 17 2022
-- Description: Update quantity of item record to dbo.Inventory
-- Code Reviewer: Victoria Sanchez

-- MODIFIED BY: 
-- MODIFIED DATE: 
-- Code Reviewer: 
-- =============================================

CREATE PROC [dbo].[Inventory_Update_Quantity]
           @UserId int
           ,@Quantity int
		   ,@Id int

AS

/*
--------- TEST CODE ----------
DECLARE @UserId int = 75
        ,@Quantity int = 15
		,@Id int = 1
 

EXECUTE dbo.Inventory_Update_Quantity 
        @UserId 
        ,@Quantity
		,@Id

SELECT *
FROM dbo.Inventory
WHERE Id = @Id

*/

BEGIN

DECLARE @DateNow datetime2 = GetUTCDATE();

UPDATE [dbo].[Inventory]

SET		[Quantity] = @Quantity
        ,[ModifiedBy] = @UserId
		,[DateModified] = @DateNow

WHERE Id = @Id

END
GO
